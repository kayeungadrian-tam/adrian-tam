<template>
  <div class="social-wrap">
    <ul>
      <li>
        <a href="links.metadata.facebook" target="_blank">
          <fa
            class="icon"
            :icon="{ prefix: 'fab', iconName: 'facebook-square' }"
          />
        </a>
      </li>
      <li>
        <a href="links.metadata.instagram" target="_blank">
          <fa
            class="icon"
            :icon="{ prefix: 'fab', iconName: 'github-square' }"
          />
        </a>
      </li>
      <li>
        <a href="links.metadata.linkedin" target="_blank">
          <fa class="icon" :icon="{ prefix: 'fab', iconName: 'linkedin' }" />
        </a>
      </li>
      <li>
        <a href="links.metadata.linkedin" target="_blank">
          <img
            src="../../assets/img/logo/Qiita.png"
            alt="Qiita"
            width="41"
            class="qiita icon"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IconComponent",
};
</script>

<style scoped>
.qiita{
    filter: contrast(1%);
}

.social-wrap {
  padding: 5% 10% 0% 10%;
}

.social-wrap li {
  display: inline-block;
  margin-right: 15px;
}
.icon {
  font-size: 3rem;
  color: #73767a;
  -webkit-transition: all 0.2s ease-in-out;
}

.icon:hover {
  color: #00bcd4;
  transition-duration: 3s;
  transition: all 0.2s linear;
  transform: scale(1.5);
}
</style>
