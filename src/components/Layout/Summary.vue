<template>
  <div class="summary">
    <TitleComponent :title="title" description="This is a description" />
    <PhotoComponent :user="user" />
    <el-row class="section-content">
      <div class="desc">
        <div class="col">
          <h2>Who am I?</h2>
          <p>
            16 “For God so loved the world, that he gave his only Son, that
            whoever believes in him should not perish but have eternal life. 17
            For God did not send his Son into the world to condemn the world,
            but in order that the world might be saved through him. 18 Whoever
            believes in him is not condemned, but whoever does not believe is
            condemned already, because he has not believed in the name of the
            only Son of God.
          </p>
        </div>
      </div>
      <div class="card-mobile">
        <div class="col">
          <CardComponent :user="user" :links="links" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import TitleComponent from "@/components/Utils/Title.vue";
import PhotoComponent from "@/components/Utils/Photo.vue";
import CardComponent from "@/components/Utils/Card.vue";

export default {
  name: "SummaryContent",
  components: {
    TitleComponent,
    PhotoComponent,
    CardComponent,
  },
  data() {
    return {
      title: "About Me",
      user: {
        name: "Adrian Tam",
        email: "tamkayeung.adrian@gmail.com",
        phone: "Phone number",
        city: "Tokyo",
        lang: "English, Japanese, Chinese",
        photo: "MyPhoto.png",
      },
    };
  },
};
</script>

<style scoped>
.summary {
  background: whitesmoke;
  height: 100vh;
  margin-top: 0px;
}
.desc {
  padding: 0% 15% 0% 15%;
}
.desc p {
  padding: 2% 0% 2% 0%;
  text-align: justify;
}

@media (min-width: 992px) {
  .section-content {
    width: 50%;
    margin: 0 auto;
    display: flex;
  }
  .section-content .col {
  }
}

</style>
