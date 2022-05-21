<template>
  <TitleComponent :title="title" description="This is a description" />
  <div class="summary">
    <PhotoComponent :user="user" />
    <div class="section-content">
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
      <div class="col">
        <CardComponent :user="user" :links="links" />
      </div>
    </div>
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
        name: "KaYeungAdrian Tam",
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
  height: 105vh;
  margin-top: 0px;
}
.desc p {
  padding: 2% 0% 2% 0%;
  text-align: justify;
}

@media (min-width: 992px) {
  .section-content {
    padding: 0% 5% 0% 15%;
    margin: 0 auto;
    display: flex;
    text-align: justify;
  }
  .section-content .col {
    flex: 50%;
  }
  .desc {
    flex: 50%;
    width: 80%;
    margin-top: 20px;
  }
}

@media (max-width: 992px) {
  .section-content {
    /* background: red; */
    padding: 1% 3% 0% 3%;
    text-align: justify;
    text-align: center;
  }
}
</style>
