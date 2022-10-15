<template>
    <div class="aboutmepage">
        <div>
            <h1>About Me</h1>
            <hr />
            <div class="info-card">
                <div class="container">
                    <div class="card">
                        <div class="imgBx">
                            <img :src="myphoto"
                                alt="photo" />
                        </div>
                        <div class="contentBx">
                            <h2>{{data.name}}</h2>
                            <div class="size">
                                <h3>{{data.info.email}}</h3>
                            </div>
                            <div class="size">
                                <h3>{{data.info.lang}}</h3>
                            </div>
                            <div class="color">
                                <fa class="icon github"
                                    icon="fa-brands fa-github" />
                                <fa class="icon"
                                    icon="fa-brands fa-linkedin" />
                                <fa class="icon"
                                    icon="fa-brands fa-facebook" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>
                {{ data.aboutMeParagraph }}
            </p>
        </div>
    </div>


</template>

<script setup lang="ts">
import myphoto from "../assets/img/new_photo.png";
import data from "../data/personal";

function test() {
    console.log("test");
}

</script>

<style scoped>
@import "../assets/css/card.css";


.icon {
    padding: 0px 15px 0px 15px;
}

.icon:hover {
    cursor: pointer;
    color: lightskyblue;

    transform: scale(1.2);
    transition: 0.25s ease-in-out;
}



p {

    text-align: justify;
}

.card-header {
    justify-content: space-between;

}

.info-card {
    max-width: 300px;
    padding: 10px 20% 0 20%;
    max-width: 640px;
    z-index: 1;
}

.aboutmepage {
    padding: 0% 20% 0 20%;
    overflow: scroll;
    max-width: 800px;
    left: 50%;
    height: 85vh;
}

img {
    max-width: 100%;
}

hr {
    width: 100%;
    margin: auto;
    margin-bottom: 20px;
}
</style>
