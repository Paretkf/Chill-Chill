<template>
  <div id="app">
    <header-view/>
    <router-view/>
  </div>
</template>

<script>
import headerView from './components/header'
export default {
  name: 'App',
  components: {
    headerView: headerView
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
