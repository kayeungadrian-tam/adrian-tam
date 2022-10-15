<script setup lang="ts">
import projects_data from "../data/projects"
</script>

<script lang="ts">

import { ref } from 'vue'
const drawer = ref(false)
const title = ref("")

const open = (item: any) => {
    console.table(item);
    drawer.value = true;
    title.value = item.description;
}
</script>


<template>
    <div class="aboutmepage">
        <h1>Projects</h1>
        <hr>
        <div class="overview">

            <div class="project-card"
                v-for="(item, i) in projects_data"
                :key="i">
                <div class="warpper">
                    <div class='grid-container'>
                        <div class='grid-item'>
                            <img :src="item.img" />
                        </div>
                        <div class='grid-item'>

                            <div class="center">
                                <el-card :body-style="{ 
                                background: i%2 == 0 ?'whitesmoke':'#f4c5a375',
                                cursor: 'pointer',
                                padding: '10px',
                                }"
                                    shadow="hover"
                                    @click="open(item)">
                                    <div clasS="description">
                                        <h3>{{item.description}}</h3>
                                        <p>{{item.overview}}</p>
                                        <el-button text
                                            class="button"></el-button>
                                    </div>
                                    <el-row :gutter="15"
                                        style="padding-left: 10px; margin-top: -40px;   justify-content: center;">
                                        <el-col :span="5"
                                            v-for="(tag, i) in item.icons"
                                            :key="i">
                                            <img class="tag-icon"
                                                :src="tag">
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <el-drawer v-model="drawer"
        :title="title"
        :with-header="false">
        <div>
            <span>{{title}}</span>
            <hr>
        </div>
    </el-drawer>
</template>

<style scoped>
.center {
    display: inline;
    /* right: 100%; */
    /* margin-left: 20px; */
    /* padding: 0 10px 0 10px; */
    /* align-items: center; */
    /* text-align: center; */
    /* margin-top: 20px; */
}

.warpper {
    background: rgba(154, 101, 47, 0.35);
    box-shadow: 0 5px 5px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    margin: 0;
}

.grid-container {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;

}

.grid-item {
    width: calc(100% - 10px);
    width: 600px;
    margin: 5px;
}

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

.el-card {
    border: 0px;
    --el-card-border-radius: 4px;
    --el-card-padding: 20px;
    --el-card-bg-color: var(--el-fill-color-blank);
}

.project-card p {
    line-height: 1.5em;
    font-size: small;
    padding-left: 20px;
    color: black;
    text-align: justify;
    ;

}

.project-card h3 {
    color: #e5781fe2;
    font-size: 1.5rem;
    ;
}

.project-card {
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;

}

.overview {
    overflow: scroll;
    height: 75vh;
    ;
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

.aboutmepage {
    padding: 0% 20% 0 20%;
    max-width: 800px;
    left: 50%;
}
</style>
