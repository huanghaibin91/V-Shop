<template>
  <div id="app">
    <Slider v-model="value" range></Slider>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      value: [20, 50]
    }
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
