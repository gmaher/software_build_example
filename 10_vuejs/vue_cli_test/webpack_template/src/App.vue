<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <stack v-bind:other_children="[]"></stack>
  </div>
</template>

<script>
import stack from './stack.vue'
export default {
  name: 'app',
  components: {stack}
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
