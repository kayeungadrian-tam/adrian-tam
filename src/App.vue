<template>
  <TopPage />
  <SummaryContent />
  <div class="page">
    <HistoryContent />
  </div>
  <div class="page2">
    <SkillComponent />
  </div>
  <div class="">
    <ProjectConponent />
  </div>
</template>

<script>
import TopPage from "./components/Layout//TopPage.vue";
import SummaryContent from "./components/Layout/Summary.vue";
import HistoryContent from "./components/Layout/History.vue";
import SkillComponent from "./components/Layout/Skills.vue";
import ProjectConponent from "./components/Layout/Projects.vue";

export default {
  name: "App",
  components: {
    TopPage,
    SummaryContent,
    HistoryContent,
    SkillComponent,
    ProjectConponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
* {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0px;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fdb813;
  background-image: linear-gradient(315deg, #fdb813 0%, #788cb6 74%);
}

.page2 {
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
}

.test-page {
  background: url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3);
  background-attachment: fixed;
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.page {
  padding: 0% 10px 3% 10px;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #000000 15%, #2d3436 64%);
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
