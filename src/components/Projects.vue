<script setup lang="ts">
import projects_data from "../data/projects";
</script>

<script lang="ts">
import { ref } from "vue";
const drawer = ref(false);
const title = ref("");

const open = (item: any) => {
    console.table(item);
    drawer.value = true;
    title.value = item.description;
};
</script>

<template>
    <div class="project-page-container">
        <div class="title">
            <h1>Projects</h1>
        </div>
        <div class="project-card"
            v-for="(item, i) in projects_data"
            :key="i">

            <div :class="
    i % 2 == 0 ? 'project-container light' : 'project-container dark'
">
                <div class="project-description">
                    <h2>{{ item.description }}</h2>

                    <el-link type="info"
                        :href="item.link"
                        target="blank"
                        :underline="false">
                        <el-button round>

                            <fa class="icon"
                                icon="fa-brands fa-github" />
                            Github
                        </el-button>
                    </el-link>
                    <p>{{ item.overview }}</p>
                    <div class="icons">
                        <div v-for="(tag, i) in item.icons"
                            :key="i">
                            <img class="tag-icon"
                                :src="tag" />
                        </div>
                    </div>
                </div>

                <img class="project-thumbnail"
                    :src="item.img" />
            </div>
        </div>
    </div>
    <el-drawer v-model="drawer"
        :title="title"
        :with-header="false">
        <div class="drawer-container">
            <div class="drawer-title">
                {{ title }}
            </div>
            <h1>Problem Statement</h1>
        </div>
    </el-drawer>
</template>

<style scoped>
@import "../assets/css/projects.css";
@import "../assets/css/drawer.css";



@media (min-width: 1000px) {
    .grid-item {
        width: calc(100% - 30px);
    }
}

@media (min-width: 1020px) {
    .grid-item {
        width: calc(50% - 20px);
    }
}

.tag-icon {
    width: 50px;
    height: 50px;
    /* vertical-align: -0.15em; */
}

.el-button {
    height: 10px;
    font-size: 0.7rem;
    margin-left: 25px;
    width: 120px;
    padding: 15px 5px;
}

.icon {
    width: 15px;
    height: 15px;
    padding-right: 5px;
}


.overview {
    overflow: scroll;
    height: 75vh;
}

img {
    display: inline;
    padding: 10px 0 10px 0;
    /* fit: center; */
    margin: 10px;
    /* width: 100%; */
    width: 350px;
    height: auto;
}

.projectspage {
    padding: 0% 20% 0 20%;
    max-width: 800px;
    left: 50%;
}
</style>
