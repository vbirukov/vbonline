<template>
    <v-layout row align-center wrap justify-center fill-height>
        <v-flex xs12 md2 :key="friend.id" v-for='friend in data.items' mb-5>
            <i v-if='friend.deactivated'>страница удалена</i>
            <h5 v-if="friend.screen_name">{{friend.first_name}}</h5>
            <h5 v-if="!friend.screen_name">{{friend.first_name + ' ' + friend.last_name}}</h5>            
            <img v-if='friend.photo_100' :src=friend.photo_100 alt="">
            <a target="blank" v-bind:href="'https://vk.com/' + friend.domain">открыть в ВК</a>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ['data'],
  data() {
      return {
          friendsList: [],
      }
  },
  methods: {
      parseFriendsList() {
        //   for (var a = 0; a < this.data.items.length; a ++) {
        //       setTimeout(console.log('tick'), 1000);
        //       setTimeout(function() {
        //           VK.Api.call('users.get', {user_ids: element, fields: 'photo_100, online', v: '5.73'}, (r) => {
        //               console.log('DBG: ' + JSON.stringify(r));
        //           this.friendsList.push(r.response[0]);
        //       });
        //       }.bind(this), 1500);              
        //   }
        //   this.data.items.forEach(element => {
        //       setTimeout(console.log('tick'), 1000);
        //       setTimeout(function() {
        //           VK.Api.call('users.get', {user_ids: element, fields: 'photo_100, online', v: '5.73'}, (r) => {
        //               console.log('DBG: ' + JSON.stringify(r));
        //           this.friendsList.push(r.response[0]);
        //       });
        //       }.bind(this), 1500);
        //   });
      }
  },    
  mounted() {
    //   this.parseFriendsList();
  }
}
</script>

<style scoped>

</style>
