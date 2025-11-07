<template>
        <main>
          <Navbar />
           <router-view />
        </main>

</template>

<script>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';



export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style scoped>
</style>
