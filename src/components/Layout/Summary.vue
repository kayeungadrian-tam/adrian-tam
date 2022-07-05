<template>
  <TitleComponent :title="title" description="" />
  <div class="summary">
    <AnimationComponent a_class="aslide-fade">
      <PhotoComponent :user="user" />
    </AnimationComponent>
    <div class="section-content">
      <div class="desc">
        <div class="col">
          <h3>Who am I?</h3>
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
import AnimationComponent from "@/components/Utils/Animation.vue";

export default {
  name: "SummaryContent",
  components: {
    TitleComponent,
    PhotoComponent,
    CardComponent,
    AnimationComponent,
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
h3 {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 2% 0% 2% 0%;
}

@media (min-width: 768px) {
  .section-content {
    padding: 0% 5% 0% 15%;
    margin: 0 auto;
    display: flex;
    text-align: justify;
    max-width: 1000px;
  }
  .section-content .col {
    flex: 50%;
  }
  .desc {
    flex: 50%;
    /* width: 80%; */
    max-width: 1000px;
    margin-top: 20px;
  }
  .summary {
    /* height: 105vh; */
    margin-top: 0px;
    padding: 0% 0% 2% 0%;
  }
}

@media (max-width: 768px) {
  .section-content {
    padding: 1% 3% 0% 3%;
    text-align: center;
    max-width: 1000px;
  }
  .desc p {
    padding: 2% 15% 2% 15%;

    text-align: justify;
    max-width: 600px;
  }
  .summary {
    margin: 0px 0px 10px 0px;
    padding: 0% 0% 2% 0%;
  }
}
</style>
