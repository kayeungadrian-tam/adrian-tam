<template>
  <div class="test">
    <el-card class="info card-mobile" shadow="hover">
      <h3>{{ user.name }}</h3>
      <div class="data">
        <strong class="sub-title">E-mail:</strong> {{ user.email }}
      </div>
      <div class="data">
        <strong class="sub-title">Phone:</strong> {{ user.phone }}
      </div>
      <div class="data">
        <strong class="sub-title">City:</strong> {{ user.city }}
      </div>
      <div class="data">
        <strong class="sub-title">Languages:</strong> {{ user.lang }}
      </div>
    </el-card>
  </div>
</template>

<script>
// import SocialBar from './SocialBar.vue'
export default {
  name: "CardComponent",
  props: ["user", "links"],
  components: {
    // SocialBar,
  },
};
</script>

<style scoped>
.test {
  padding: 0% 10% 0% 10%;
}

@media (max-width: 992px) {
  .info {
    padding: 1%;
    width: 75vw;
  }
  .info .data {
    margin-bottom: 15px;
    text-align: center;
  }
  h3 {
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 992px) {
  .card-mobile {
    text-align: center !important;
    margin-top: 20px;
    width: 25vw;
    justify-content: center;
    align-items: left;
    text-align: left;
    /* right: 50%; */
  }
  .info .data {
    margin-bottom: 10px;
    text-align: left;
  }
  h3 {
    margin-bottom: 1.5rem;
  }
}
</style>
