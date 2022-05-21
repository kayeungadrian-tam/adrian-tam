<template>
  <TopPage />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Really ABOUT</router-link>
  </nav>
  <router-view/>
</template>


<script>
import TopPage from "./components/TopPage.vue";

export default {
  name: "App",
  components: {
    TopPage,
  },
}


</script>

<style>
html,
body {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
