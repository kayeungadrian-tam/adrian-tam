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
                                <!-- {{ flag }} -->
                            </div>
                        </div>

                        <div class="color">
                            <fa class="icon"
                                icon="fa-brands fa-github"
                                @click="newLink(data.links.githubLink)">
                            </fa>
                            <fa class="icon"
                                icon="fa-brands fa-linkedin"
                                @click="newLink(data.links.linkedinLink)" />
                            <img class="icon qiita_logo"
                                :src=qiita_logo
                                @click="newLink(data.links.qiitaLink)" />
                            <fa class="icon"
                                icon="fa-brands fa-facebook"
                                @click="newLink(data.links.facebookLink)" />
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
import { ref } from "vue";

import myphoto from "../assets/img/new_photo_3.png";
import data from "../data/personal";

import qiita from "../assets/img/logo/Qiita.png";

const qiita_logo = ref(qiita);

function test() {
    console.log("test");
}

const newLink = (url: string) => {
    // console.log(url)
    window.open(url, "_blank");
}


</script>

<style scoped>
@import "../assets/css/card.css";
</style>
