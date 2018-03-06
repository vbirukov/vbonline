<template>
    <div>
      <h3>List your:</h3>
      <h3>Da fuq is not working?!?!?!  {{user.uid}}</h3>
        <ul>
            <li :key='item.id' v-for='item in menu'><button @click='runRequest(item)'>{{item.name}}</button></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['user'],
    data() {
        return {
            menu:
                [
                    {
                        name: 'Albums',
                        command: 'photos.GetAlbum',
                        id: 'getAlbumsBtn',
                        options: {
                                v: "5.73"
                            }
                    },
                    {
                        name: 'Friends',
                        command: 'friends.get',
                        id: 'getFriendsBtn',
                        options: {
                            user_id: 123,
                            count: 5000,
                            v: '5.73'
                        }
                    },
                    {
                        name: 'Docs',
                        command: 'docs.get',
                        id: 'getDocsBtn',
                        options: function() {
                            return {
                                owner_id: 1,
                                count: 2000,
                            }
                        }
                    },   
                
                    {
                        name: 'Groups',
                        command: 'groups.get',
                        id: 'getGroupsBtn',
                        options: function() {
                            return {
                                user_id: 1,
                                extended: 1,
                                count: 1000,
                            }
                        }
                    },                                            
                ]
        }
    },
    methods: {
        runRequest(apiMethod) {
            console.log('Beep... runnning av api call');
            apiMethod.options.user_id = this.user.uid;
            console.log('call options listing: ' + JSON.stringify(apiMethod.options) );
            VK.Api.call(apiMethod.command, apiMethod.options, function(r, err) {
                if(r.response) {
                    console.log('respose received: ' + JSON.stringify(r.response));
                } else {
                    console.log(err);
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
