<template>
    <v-toolbar :height='100' app>
        <h3>List your:</h3>
        <v-flex>
            <v-btn :key='item.id' v-for='item in menu.main' class='info'><button @click='runRequest(item)'>{{item.name}}</button></v-btn>
        </v-flex>
        <user-info v-if='user.loggedIn' :user='user'></user-info>
        <v-btn color="red white--text" @click='user.login = false'>Logout<v-icon>power_settings_new</v-icon></v-btn>
    </v-toolbar>
</template>

<script>
import { eventBus } from '../../main';
import userInfo from './user-info.vue';

export default {
    props: ['user'],
    data() {
        return {
            menu: {
                main: [
                    {
                        name: 'Albums',
                        method: 'photos.getAlbums',
                        id: 'getAlbumsBtn',
                        options: {
                            user_id: this.user.uid,
                            count: 1000,   
                        }
                    },
                    {
                        name: 'Friends',
                        method: 'friends.get',
                        id: 'getFriendsBtn',
                        options: {
                            user_id: this.user.uid,
                            count: 5000,
                            
                        }
                    },
                    {
                        name: 'Docs',
                        method: 'docs.get',
                        id: 'getDocsBtn',
                        options: {
                            owner_id: this.user.uid,
                            count: 2000,
                        }
                    },   
                
                    {
                        name: 'Groups',
                        method: 'groups.get',
                        id: 'getGroupsBtn',
                        raw: true,
                        options: {
                            user_id: this.user.uid,
                            extended: 1,
                            count: 1000,
                        }
                    },                                            
                ],
                analytics: [
                    {
                        name: 'Groups popular among your friends',
                        todo: this.groupsMatched,
                    }
                ],
            },
            sensors: {
                statusString: false,
                completion: 0,
            },
            tempData: {},
            temp: {},
            completedWidth: 0,
            max: 0,
        }
    },
    methods: {
        runRequest(callProps) {
            let temp = this.temp;
            console.log('Beep... runnning an api call with following props: ' + JSON.stringify(callProps));
            // console.log('user_id is: ' + this.user.uid)
            // callProps.options.user_id = this.user.uid;
            callProps.options.v = '5.73';
            console.log('call options listing: ' + JSON.stringify(callProps.options) );
            VK.Api.call(callProps.method, callProps.options, function(r) {
                if(r['error']) {
                    console.log('errior while running request');
                    console.log(r.error);
                    return 'error'
                }                
                if (callProps.raw) {
                    if(r.response) {
                        console.log('respose received: ' + JSON.stringify(r.response));
                        r.response.type = callProps.name;
                        eventBus.$emit('dataReceived', r.response);
                    } else {
                        console.log('unhandled responce: ' + r);
                    }
                } else if (!callProps.raw) {
                    if(r.response) {
                        console.log('this should  run corret ' + r);
                        temp = r.response;
                        console.log(temp);
                    } else {
                        console.log('unhandled responce: ' + r);
                    }                        
                }
            }.bind(this));
        },
        runPromiseRequest(callProps) {
            return new Promise((resolve, reject) => {
                callProps.options.v = '5.73';
                console.log('Beep... runnning an api call with following props: ' + JSON.stringify(callProps));
                console.log('call options listing: ' + JSON.stringify(callProps.options) );
                VK.Api.call(callProps.method, callProps.options, function(r) {
                    if(r['error']) {
                        console.log('errior while running request');
                        console.log(r.error);
                        resject('error' + r.error); 
                    }                
                    if (callProps.raw) {
                        if(r.response) {
                            console.log('respose received: ' + JSON.stringify(r.response));
                            r.response.type = callProps.name;
                            resolve('dataReceived', r.response);
                        } else {
                            console.log('unhandled responce: ' + r);
                            reject('uhnandled response: ' + JSON.stringify(r));
                        }
                    } else if (!callProps.raw) {
                        if(r.response) {
                            console.log('this should  run corret ' + r);
                            resolve(r.response);
                        } else {
                            console.log('unhandled responce: ' + r);
                            reject(r);
                        }                        
                    }
                });                
            });
            
        },
        groupsMatched() {
            // reseting previous results;
            this.tempData = [];
            this.user.friendsGroups = {};
            this.user.errorFriends = [];

            // requesting friends list
            let callProps = {
                options: {
                    user_id: this.user.uid
                },
                method: 'friends.get',
                raw: false,
            };

        // request friends, and after receiving results, process the list
            this.runPromiseRequest(callProps).then(res => this.processFriendsList(res)).then(resolve => this.filterFriendsGroups());
        },
        processFriendsList(r) {
            return new Promise((resolve, reject) => {      
                let lastindex = 0;
                console.log('processing list of friends received ' + JSON.stringify(r));
                let indexControl = r.items.forEach(function(currentValue, index, array){
                    let delay = index; 
                    
                    if (index == 1) {
                        console.log('array length: '+ array.length);
                    }
                    setTimeout(() => {
                        
                        this.sensors.completion = index / ( array.length / 100 );  
                        if (index == array.length) {
                            this.sensors.completion = 100;
                            console.log('index: ' + index);
                            console.log('array.length: ' + array.length);
                        }      
                        VK.Api.call('groups.get', {user_id: currentValue, v: '5.73'}, function(r) 
                        {
                            if (r.response) {
                                r.response.items.forEach(function(item) {
                                    this.user.friendsGroups[item] ? this.user.friendsGroups[item] += 1 : this.user.friendsGroups[item] = 1;    
                                    lastindex = index;
                                    if(lastindex > 1670) {
                                        console.log('passed index: ' + lastindex + " " + lastindex);
                                    }   
                                    if(lastindex == (array.length-1)) {
                                        console.log('last processed index: ' + lastindex); 
                                        console.log('last processed index: ' + index); 
                                        console.log('current item: ' + currentValue); 
                                        console.log('request & processing coplete. ' + JSON.stringify(this.user.friendsGroups));
                                        resolve();  
                                    }
                                }.bind(this));
                            } else if (r.error) {
                                console.log('an error ocurred, with getting friends info');
                                console.log('friend id: ' + currentValue);
                                console.log('error text: ' + JSON.stringify(r.error));
                                console.log('index: ' + index);
                                if (r.error.error_code == 18) {
                                    this.user.errorFriends.push(currentValue);
                                }
                                lastindex = index;
                                                    if(lastindex > 1670) {
                                    console.log('passed index: ' + lastindex + " " + lastindex);
                                }   
                                if(lastindex == (array.length-1)) {
                                    console.log('last processed index: ' + lastindex); 
                                    console.log('last processed index: ' + index); 
                                    console.log('current item: ' + currentValue); 
                                    console.log('request & processing coplete. ' + JSON.stringify(this.user.friendsGroups));
                                    resolve();  
                                }
                            }
                        }.bind(this))
                    }, delay * 500);

                }.bind(this));
                console.log('indexControl: ' + indexControl);
            })                  
        },
      filterFriendsGroups() {
        console.log('getting ready to parse these records: ' + JSON.stringify(this.user.friendsGroups));
        this.analyzed = [];
        this.analyzed.idList = [];
        for (let group in this.user.friendsGroups) {
            console.log('group: ' + this.user.friendsGroups[group]);
            console.log('max: ' + this.max);
            if (this.user.friendsGroups[group] > this.max) {
                let newRecord = {
                    id: group,
                    match: this.user.friendsGroups[group],
                }
                this.analyzed.idList.push(group);
                this.analyzed.push(newRecord);
            }   
        }

        console.log('analyzed: ' + JSON.stringify(this.analyzed));
        let callProps = {};
        callProps.method = 'groups.getById';
        callProps.options = {
            group_ids: this.analyzed.idList,
        };
        callProps.name = 'Groups';
        callProps.raw = true;
        this.runRequest(callProps);
      },
    },
    components: {
        userInfo,
    }
}
</script>

<style scoped>
    .frame h5 {
        word-wrap:normal;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;    
        justify-content: center;
        flex: 1;
    }

    .flex-start {
        align-items: flex-start;    
    }

    .narrow {
        max-width: 20px;
    }

    .section {
        border-radius: 5%;
        box-shadow: 1px 1px 2px 2px gainsboro;
        align-self: stretch;
    }

    .section:last-child {
        margin-left: 1rem; 
    }
</style>
