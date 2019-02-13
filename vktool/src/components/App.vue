<template>
  <div id="app">
    <h1 v-if="!user.loggedIn">{{ msg }}</h1>
    <login v-if='!user.loggedIn'></login>
    <!-- <button v-if='user.loggedIn' @click='parseLoginData'>Login here</button> -->
    <user-info v-if='user.loggedIn' :user='user'></user-info>
    <main-menu v-if='user.loggedIn' :user='user'></main-menu>
    <display-space v-if='response' :data='response'></display-space>
    <postprocess :data='response'></postprocess>
  </div>
</template>

<script>
import login from './modules/utilities/login.vue';
import userInfo from './modules/panels/user-info.vue';
import MainMenu from './modules/panels/MainMenu.vue';
import {eventBus} from './main.js';
import DisplaySpace from './modules/display/DisplaySpace.vue';
import VkCaller from './modules/utilities/VkCaller.vue';
import PostProcess from './modules/utilities/PostProcess.vue';

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
        friends: 0,
      },
      response: false,
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
          this.user.avatarSrc = r.response[0]['photo_807'];
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
          setTimeout(this.resetAvatar(r.response), 1000);
        } else if(e) {
          console.log('error while running api request: ' + e);
        }
      }.bind(this));
    },
    retrieveFriends() {
      VK.Api.call('friends.get', {user_id: this.user.uid, v: '5.73'}, function(r, e) {
        this.user.friends = r.response.count;

      }.bind(this));
    },
    retrieveGroups() {
      VK.Api.call('groups.get', {user_id: this.user.uid, v: '5.73'}, function(r, e) {
        this.user.groups = r.response.count;
       }.bind(this));
    },
    initiateUserInfo() {
      this.retrieveAvatar();
      this.retrieveFriends();
      this.retrieveGroups();
    },
  },
  components: {
    'login': login,
    'user-info': userInfo,
    'main-menu': MainMenu,
    'display-space': DisplaySpace,
    'VkCaller': VkCaller,
    'postprocess': PostProcess,
  },
  mounted: function() {
  },
  created: function() {
    eventBus.$on('userLoggedIn', (userData) => {
      this.user.name = userData.first_name + ' ' + userData.last_name;
      this.user.uid = userData.id;
      this.user.loggedIn = true;
      this.initiateUserInfo();
    });
    eventBus.$on('dataReceived', (responseData) => {
      this.response = responseData;
    });
    eventBus.$on('loadGroup', (groupInfo) => {
      console.log('id: ' + groupInfo);
      VK.Api.call('wall.get', {owner_id: (-groupInfo.id), count: 100, v: '5.73'}, (r) => {
        console.log('group get response: ' + JSON.stringify(r.response));
        r.response.type = 'group';
        r.response.title = groupInfo.name;  
        r.response.offset = 100;
        r.response.groupId = groupInfo.id;
        this.response = r.response;
      });
    });
    eventBus.$on('callVk', (props) => {
        console.log('got event, calling Vk');
        MainMenu.methods.runRequest(props);
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

button {
  padding: 0.5rem 0.75rem;
  background-color: azure;
  border: 1px solid aqua;
  box-shadow: 1px 1px 1px 1px gray;
}

button:active {
  transform: translate(1, 1);
  box-shadow: none;
}

.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1050px;
    margin-left: auto;
    margin-right: auto;
}

.frame {
    padding: 5px;
}

.narrow {
  width: 15px;
}

.flex-row {
    display: flex;
    flex-direction: row;
}

p {
    word-wrap: break-word;
}
</style>
