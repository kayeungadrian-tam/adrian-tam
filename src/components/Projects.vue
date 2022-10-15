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
        <div>
            <h1>Projects</h1>
            <hr>
        </div>
        <div class="overview">
            <div class="project-card"
                v-for="(item, i) in projects_data"
                :key="i">

                <el-card :body-style="{ 
                padding: '0px 0px 0px 0px',
                background: i%2 == 0 ?'whitesmoke':'#f4c5a375',
                cursor: 'pointer',
                margin: '0px 0px 0px -10px'
                }"
                    shadow="hover"
                    @click="open(item)">
                    <el-row>
                        <el-col :span="12">
                            <img :src="item.img"
                                class="image" />
                        </el-col>
                        <el-col :span="12"
                            style="padding-left:20px;">
                            <div clasS="description">
                                <h3>{{item.description}}</h3>
                                <p>{{item.overview}}</p>
                                <el-button text
                                    class="button"></el-button>
                            </div>
                            <el-row :gutter="15"
                                style="padding-left: 10px; margin-top: -40px;">
                                <el-col :span="5"
                                    v-for="(tag, i) in item.icons"
                                    :key="i">
                                    <img class="tag-icon"
                                        :src="tag">
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>


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
.description {
    padding-right: 20px;
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
    color: #e5781fe2
}

.project-card {
    padding-bottom: 20px;

}

.overview {
    overflow: scroll;
    height: 75vh;
    ;
}

img {
    display: inline-block;
    padding: 10px 0 10px 0;
    /* fit: center; */
    /* margin: 20px; */
    /* width: 100%; */
    width: 300px;
    height: auto;
}

.aboutmepage {
    padding: 0% 20% 0 20%;
    max-width: 800px;
    left: 50%;
}
</style>
