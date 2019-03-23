<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <timer></timer>
  </div>
</template>

<script>
import timer from './components/timer'

export default {
  name: 'app',
  components: {
    timer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
