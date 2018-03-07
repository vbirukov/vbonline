<template>
  <div id="app">
    <h1 v-if="!user.loggedIn">{{ msg }}</h1>
    <login v-if='!user.loggedIn'></login>
    <!-- <button v-if='user.loggedIn' @click='parseLoginData'>Login here</button> -->
    <user-info :user='user'></user-info>
    <main-menu :user='user'></main-menu>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import login from './login.vue';
import userInfo from './user-info.vue';
import MainMenu from './MainMenu.vue';
import {eventBus} from './main.js'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to essential VK Tool',
      token: 0,
      user: {
        loggedIn: false,
        uid: 0,
        avatarSrc: '',
      },
      response: '',
    }
  },
  methods: {
    display(response) {
      console.log('displaying response');
      this.response = response;
    },
    resetAvatar(response) {
      VK.Api.call('photos.getById', {owner_id: this.user.uid, photos: response[0].photo_id, v:'5.73'}, function(r){
        if(r.response[0]['photo_807']) {
          this.user.avatarSrc = r['response'][0]['photo_807'];
          console.log('reseting avatar with pic src: ' + r['response'][0]['photo_807']);
          console.log('new avatar is set: ' + this.user.avatarSrc);
        } 
        console.log('photo src, should be somewhere here: ' + JSON.stringify(r));
      }.bind(this));
    },
    retrieveAvatar () {
      VK.Api.call('users.get', {user_ids: this.user.uid, fields: 'photo_id', v:'5.73'}, function(r, e) {
        if(r) {
          console.log('avatar id received, requesting src of file');
          this.resetAvatar(r.response);
        } else if(e) {
          console.log('error while running api request: ' + e);
        }
      }.bind(this));
    },
  },
  components: {
    'login': login,
    'user-info': userInfo,
    'main-menu': MainMenu,
  },
  mounted: function() {
  },
  created: function() {
    eventBus.$on('userLoggedIn', (userData) => {
      this.user.name = userData.first_name + ' ' + userData.last_name;
      this.user.uid = userData.id;
      this.user.loggedIn = true;
      this.retrieveAvatar();
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
