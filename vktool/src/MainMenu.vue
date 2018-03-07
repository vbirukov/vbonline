<template>

    <div>
      <h3>List your:</h3>
        <ul>
            <li :key='item.id' v-for='item in menu'><button @click='runRequest(item)'>{{item.name}}</button></li>
        </ul>
    </div>
</template>

<script>
import { eventBus } from './main';

export default {
    props: ['user'],
    data() {
        return {
            menu:
                [
                    {
                        name: 'Albums',
                        command: 'photos.getAlbums',
                        id: 'getAlbumsBtn',
                        options: {
                            user_id: this.user.uid,
                            count: 1000,   
                        }
                    },
                    {
                        name: 'Friends',
                        command: 'friends.get',
                        id: 'getFriendsBtn',
                        options: {
                            user_id: this.user.uid,
                            count: 5000,
                            
                        }
                    },
                    {
                        name: 'Docs',
                        command: 'docs.get',
                        id: 'getDocsBtn',
                        options: {
                            owner_id: this.user.uid,
                            count: 2000,
                        }
                    },   
                
                    {
                        name: 'Groups',
                        command: 'groups.get',
                        id: 'getGroupsBtn',
                        options: {
                            user_id: this.user.uid,
                            extended: 1,
                            count: 1000,
                        }
                    },                                            
                ]
        }
    },
    methods: {
        runRequest(apiMethod) {
            console.log('Beep... runnning an api call');
            console.log('user_id is: ' + this.user.uid)
            // apiMethod.options.user_id = this.user.uid;
            apiMethod.options.v = '5.73';
            console.log('call options listing: ' + JSON.stringify(apiMethod.options) );
            VK.Api.call(apiMethod.command, apiMethod.options, function(r, err) {
                if(r.response) {
                    console.log('respose received: ' + JSON.stringify(r.response));
                    eventBus.$emit('dataReceived', r.response);
                } else if(err) {
                    console.log(err);
                }
            });
        }
    },

}
</script>

<style scoped>

</style>
