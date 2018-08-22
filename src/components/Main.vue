<template>
  <div id="app">
    <Header/>
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  export default {
    name: 'main-app',
    components: {Header}
  }
</script>
