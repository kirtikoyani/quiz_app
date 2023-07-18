<template>
  <div id="app">
    <header>
      <router-view name="header"></router-view>
    </header>

    <main>
      <router-view></router-view>
    </main>
<!-- <extra/> -->
    <footer>
      <router-view name="footer"></router-view>
    </footer>
  </div>
</template>

<script>
// import extra from './components/extra.vue';
export default {
  // components: { extra },
  name: 'App',
};
</script>
