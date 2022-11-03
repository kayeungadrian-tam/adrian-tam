<template>
    <div class="aboutme-page-container">
        <div>
            <div class="title">
                <h1>About Me</h1>
            </div>
            <div class="container">
                <div class="card">
                    <div class="imgBx">
                        <img :src="myphoto"
                            alt="photo" />
                    </div>
                    <div class="contentBx">
                        <h2>{{ data.name }}</h2>
                        <div class="size">
                            <h3>{{ data.info.email }}</h3>
                        </div>
                        <div class="size">
                            <div v-for="(flag, i) in data.info.lang"
                                :key="i"
                                class="flag">
                                {{ flag }}
                            </div>
                        </div>


                        <div class="color">
                            <fa class="icon"
                                icon="fa-brands fa-github" />
                            <fa class="icon"
                                icon="fa-brands fa-linkedin" />
                            <fa class="icon"
                                icon="fa-brands fa-facebook" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="para">
                <p>
                    {{ data.aboutMeParagraph }}
                </p>

            </div>
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
</style>
