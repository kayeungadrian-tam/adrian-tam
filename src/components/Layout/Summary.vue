<template>
  <TitleComponent :title="title" description="Summary" />
  <div class="summary">
    <AnimationComponent a_class="aslide-fade">
      <PhotoComponent :user="user" />
    </AnimationComponent>
    <div class="section-content">
      <div class="desc">
        <div class="col">
          <h3>Who am I?</h3>
          <p>
            Motivated artificial intelligence engineer with a strong background
            in delivering machine learning solutions to solve real-world
            problems. 2+ years of experience include applying object detection
            algorithms for autonomous driving and managing a team of 4 engineers
            in developing an AI-driven learning management system. Capable of
            translating business requirements into ai-driven solutions. Eager to
            apply, combine and modify existing technologies to get work done.
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
        photo: "new_photo.png",
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

p {
  line-height: 1.2;
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
    /* line-height: 15rem; */
    text-align: justify;
    max-width: 600px;
  }
  .summary {
    margin: 0px 0px 10px 0px;
    padding: 0% 0% 2% 0%;
  }
}
</style>
