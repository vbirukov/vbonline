<template>
  <div id="app">
    <tbl></tbl>
  </div>
</template>

<script>
import tbl from './components/tbl'

export default {
  name: 'app',
  components: {
    tbl,
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
