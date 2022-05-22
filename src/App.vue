<template>
  <TopPage />
  <SummaryContent />
  <div class="page">
    <HistoryContent />
  </div>
  <div class="page2">
    <SkillComponent />
  </div>
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
import HistoryContent from "./components/Layout/History.vue";
import SkillComponent from "./components/Layout/Skills.vue";

export default {
  name: "App",
  components: {
    TopPage,
    SummaryContent,
    HistoryContent,
    SkillComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
* {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

.page2 {
  height: 100vh;
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
}

.page {
  height: 100vh;
  padding: 0% 10px 3% 10px;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #000000 15%, #2d3436 64% );
  color: white;
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
