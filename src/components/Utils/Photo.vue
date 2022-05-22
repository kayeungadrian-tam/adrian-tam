<template>
  <div>
    <div class="photo">
      <a>
        <img :src="getImgUrl(user.photo)" width="200" alt="photo" />
      </a>
    </div>
  </div>
 
</template>

<script>
export default {
  name: "PhotoComponent",
  props: ["user"],
  methods: {
    getImgUrl(img) {
      return require("@/assets/img/" + img);
    },
  },
};
</script>

<style scoped>


.photo {
  padding-top: 1%;
  animation-name: bounce-3;
  animation-timing-function: ease;
}
img {
  max-width: 100%;
}
</style>
