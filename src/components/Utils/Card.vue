<template>
  <div class="info card-mobile">
    <h3>{{ user.name }}</h3>
    <div class="data"><strong>E-mail:</strong> {{ user.email }}</div>
    <div class="data"><strong>Phone:</strong> {{ user.phone }}</div>
    <div class="data"><strong>City:</strong> {{ user.city }}</div>
    <div class="data"><strong>Languages:</strong> {{ user.lang }}</div>
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
@media (min-width: 992px) {
  .info {
    padding: 1%;
  }
  .info .data {
    margin-bottom: 15px;
    text-align: center;
  }
  h3 {
    margin-bottom: 15px;
    text-transform: uppercase;
  }
}
@media (max-width: 992px) {
  .card-mobile {
    text-align: center !important;
    margin-top: 20px;
    width: 100vw;
    justify-content: center;
    align-items: center;
    text-align: justify;
    left: 50%;
  }
  .info .data {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
