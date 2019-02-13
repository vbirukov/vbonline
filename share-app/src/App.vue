<template>
  <v-app>    
    
    <v-navigation-drawer v-model="navigationView" app class='orange'>
      <v-btn color="info" @click='user.login = false'>Logout</v-btn>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon @click="navigationView = !navigationView"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-flex v-for='link in toolbar' :key="link.icon">
        <v-btn  color="info" v-on:click='setActive(link.setActive)'><v-icon>{{ link.icon }}</v-icon></v-btn>
      </v-flex>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <login v-if='!user.login' :user='user'></login>
      <Mainboard v-if='user.login' :UserData='UserData.profile' :session='session'></Mainboard>
      <HelloWorld v-if='false'/>
    </v-content>


  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import login from './components/login'
import Mainboard from './components/Mainboard'
import UserData from './components/UserData'

export default {
  name: 'App',
  components: {
    HelloWorld,
    login,
    Mainboard,
    UserData,
  },
  data () {
    return {
      navigationView: false,
      user: {
        name: 'username',
        login: false,
        FullName: 'Риши Нитьяпрагья',
        balance: 10,
        city: 'Бангалор',
        regDate: '10/02/2018',
        data: UserData
      },
      
      session: {
        active: 'profile',
      },
      toolbar: [
        {icon: 'dashboard', setActive: 'inventory'},
        {icon: 'person', setActive: 'profile'},
        {icon: 'search', setActive: 'search'}
      ]
    }
  },
  methods: {
    setActive(state) {
      this.session.active = state;
    }
  }
}
</script>
