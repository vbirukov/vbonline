<template>
  <v-app>
    <v-content>
      <menuSelector></menuSelector>
    </v-content>
  </v-app>
</template>

<script>
import menuSelector from './components/menu'


export default {
  name: 'App',
  components: {
    menuSelector
  },
  data () {
    return {
      //
    }
  }
}
</script>
