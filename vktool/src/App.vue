<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>A place, where you can satisfy all your VK needs</h2>
    <login v-if='!user.loggedIn'></login>
    <!-- <button v-if='user.loggedIn' @click='parseLoginData'>Login here</button> -->
    <user-info :user='user'></user-info>
    <button @click="runRequest">Test request</button>
    <h1>{{response}}</h1>
    <h3>List your:</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Groups</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Friends</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Docs</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Links</a></li>
    </ul>
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
let callbackFunc = this.display;
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to essential VK Tool',
      token: 0,
      // token: '14b47537638f8073888a0bb17e3b3246ec085b5254e4d3c8e8a765a4a736578fc89a2f63e5710394e8e7b',
      user: {
        loggedIn: false,
        uid: 0,
      },
      response: 'text',
    }
  },
  methods: {
    findParameterBetween(begin, end, url) {
      console.log('DBG. runnin findParameters. Begin:' + begin + " end: " + end);
      console.log('url: ' + url);
      begin = url.search(begin) + 6;
      console.log('begin found at: ' + begin);
      end = url.search(end) - 1;
      console.log('end found at: ' + end);
      return url.slice(begin, end);
    },
    parseLoginData() {
      let url = window.location.toString();
      console.log('reading url: ' + url);
      this.token = this.findParameterBetween('token', 'expires', url);
      console.log('login data read, token #is: ' + this.token);
      let begin = url.search('id=') + 3;
      this.user.uid = url.slice(begin);
      console.log('user id: ' + this.user.uid);
    },
    display(response) {
      console.log('displaying response');
      this.response = response;
    },
    runRequest() {
      VK.Api.call('users.get', {user_ids: 6492, v:"5.73"}, function(r) {
        if(r.response) {
          alert('Привет, ' + r.response[0].first_name);
        }
      });
    },
  },
  components: {
    'login': login,
    'user-info': userInfo,
  },
  mounted: function() {
    console.log('login mounted');
    if( window.location.toString().indexOf('token') !== -1) {
      console.log('login link detected');
      this.user.loggedIn = true;
      this.parseLoginData();
      console.log('logged in');
      console.log('looking for user avatar & name');
    } else {
      console.log('login false');
    }
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
