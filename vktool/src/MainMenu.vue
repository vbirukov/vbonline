<template>
    <div>
      <h3>List your:</h3>
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
                                
                            }
                    },
                    {
                        name: 'Friends',
                        command: 'friends.get',
                        id: 'getFriendsBtn',
                        options: {
                            user_id: 123,
                            count: 5000,
                            
                        }
                    },
                    {
                        name: 'Docs',
                        command: 'docs.get',
                        id: 'getDocsBtn',
                        options: function() {
                            return {
                                owner_id: user.uid,
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
                                user_id: user.uid,
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
            apiMethod.options.v = '5.73';
            console.log('call options listing: ' + JSON.stringify(apiMethod.options) );
            VK.Api.call(apiMethod.command, apiMethod.options, function(r, err) {
                if(r.response) {
                    console.log('respose received: ' + JSON.stringify(r.response));
                } else {
                    console.log(err);
                }
            });
        }
    },

}
</script>

<style scoped>

</style>
