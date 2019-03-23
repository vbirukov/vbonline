<template>
  <v-app>
    <v-toolbar app v-if="false">
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <list></list>

    <v-content>
    </v-content>
  </v-app>
</template>

<script>
import list from './components/list'

export default {
  name: 'App',
  components: {
    list
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  body {
    max-width: 100vw;
  }
</style>
