<template>
        <main>
          <Navbar />
           <router-view />
           <Footer />
        </main>

</template>

<script>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';



export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style scoped>
body {
  background-color: #f6f8f7;
  padding-top: 80px;
  font-family: 'Poppins', sans-serif;
}
</style>
