<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>You are: {{user.uid}}  <span v-if='user.loggedIn'>logged in</span> <span v-if='!user.loggedIn'>not logged in</span></h2>
    <login v-if='!user.loggedIn'></login>
    <!-- <button v-if='user.loggedIn' @click='parseLoginData'>Login here</button> -->
    <user-info :user='token'></user-info>
    <button @click="runRequest">Test request</button>
    <h1>{{response}}</h1>
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

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to essential VK Tool',
      token: 0,
      user: {
        loggedIn: false,
        uid: 0,
      },
      response: '',
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
    'main-menu': MainMenu,
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
