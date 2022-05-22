<template>
  <div class="timeline">
    <div class="subtitle">{{ subtitle }}</div>
    <el-timeline>
      <el-timeline-item
        v-for="exp in indata"
        :key="exp"
        :timestamp="exp.period"
        :color="exp.color"
        placement="top"
      >
        <div class="desc">{{ exp.name }}</div>

        <ul>
          <li v-for="(role, index) in exp.description" :key="index">
            {{ role }}
          </li>
        </ul>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap");

@media (max-width: 992px) {
  .desc {
    font-size: 1.1rem;
    font-family: "Sawarabi Mincho", sans-serif;
    color: whitesmoke;
  }

  .subtitle {
    margin-bottom: 20px;
    font-size: 1.1em;
    text-align: center;
    color: #eee;
    text-shadow: 0 0 20px #eee;
  }

  li {
    font-size: 0.8rem;
    font-family: "Sawarabi Mincho", serif;
    color: whitesmoke;
  }
}

@media (min-width: 992px) {
  .desc {
    font-size: 1.5rem;
    font-family: "Sawarabi Mincho", sans-serif;
    color: whitesmoke;
  }

  li {
    font-size: 1.1rem;
    font-family: "Sawarabi Mincho", serif;
    color: whitesmoke;
  }
  .subtitle {
    margin-bottom: 20px;
    font-size: 1.5em;
    text-align: center;
    color: #eee;
    text-shadow: 0 0 20px #eee;
  }
}

.timeline {
  margin: auto;
  padding: auto;
  font-family: "M PLUS 1p", sans-serif;
  font-size: 1.2em;
}
</style>

<script>
export default {
  name: "TimeLine",
  props: ["subtitle", "indata"],
  components: {},
};
</script>
