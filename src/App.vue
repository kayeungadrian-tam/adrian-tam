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
  background: whitesmoke;
  padding: 0% 10px 3% 10px;
  color: white;
}

.page {
  height: 100vh;
  background: black;
  padding: 0% 10px 3% 10px;
  background-image: linear-gradient(
    135deg,
    rgba(51, 144, 181, 0.41) 10%,
    rgba(163, 111, 20, 0.5) 100%
  );
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
