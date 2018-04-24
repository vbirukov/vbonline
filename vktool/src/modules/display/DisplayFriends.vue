<template>
    <div class="container">
        <div class='frame' :key="friend.id" v-for='friend in friendsList'>
            <h5 v-if="friend.screen_name">{{friens.first_name}}</h5>
            <img v-if='friend.photo_100' :src=friend.photo_100 alt="">
        </div>
    </div>
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
          this.data.items.forEach(element => {
              setTimeout(function() {
                  VK.Api.call('users.get', {user_ids: element, fields: 'photo_100, online', v: '5.73'}, (r) => {
                  this.friendsList.push(r.response[0]);
              });
              }.bind(this), 100);
          });
      }
  },    
  mounted() {
      console.log('friendsList mounted');
      this.parseFriendsList();
  }
}
</script>

<style scoped>

</style>
