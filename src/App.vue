<template>
  <TopPage />
  <SummaryContent />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Really ABOUT</router-link>
  </nav>
  <div class="page">
    <router-view />
  </div>
</template>

<script>
import TopPage from "./components/Layout//TopPage.vue";
import SummaryContent from "./components/Layout/Summary.vue";

export default {
  name: "App",
  components: {
    TopPage,
    SummaryContent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
* {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

.page {
  height: 100vh;
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
