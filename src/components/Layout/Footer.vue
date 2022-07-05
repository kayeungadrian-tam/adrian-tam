<template lang="">
  <footer class="site-footer">
    <div class="">
      <div class="">
        <p class="copyright-text">Made with 💖 and ☕ by ME!</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "FooterComponent",
  components: {},
};
</script>
<style scoped>
.site-footer {
  background-color: #26272b;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
  padding: 20px 0px 10px 0px;
}

.copyright-text {
  margin: 0;
}
@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}
</style>
