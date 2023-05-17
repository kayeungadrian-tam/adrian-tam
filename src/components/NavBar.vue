<template>
    <header class="header">
        <div class="header-inner">
            <router-link to="/"
                class="header-logo">
                Adrian Tam
            </router-link>
            <nav class="header-menu">
                <div class="full-menu">
                    <ul>
                        <li v-for="(item, i) in items"
                            :key="i">
                            <router-link :to="item.path">
                                <fa class="icon fa-lg"
                                    :icon="item.icon"></fa>
                                {{ item.label }}
                            </router-link>
                        </li>
                        <li>
                            <div @click="toResume"
                                style="width:100%; cursor:pointer;"><span>
                                    <fa class="icon fa-lg"
                                        icon="fa-solid fa-arrow-up-right-from-square"></fa>
                                    Resume
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="hamburger-menu">
                    <el-menu :router="true"
                        :default-active="activeIndex"
                        menu-trigger="click"
                        text-color="Black"
                        class="el-menu-demo transbackground"
                        mode="horizontal"
                        background-color="transparent"
                        active-text-color="#533f20"
                        :ellipsis="false"
                        @select="handleSelect">
                        <el-sub-menu index="0"
                            style="min-height: 50px;">
                            <template #title>
                                <fa class="fa-xl"
                                    icon="fa-solid fa-bars" />
                            </template>

                            <div v-for="(item, i) in items"
                                :key="i">
                                <el-menu-item>
                                    <router-link :to="item.path"
                                        style="width:100%;">
                                        <fa class="icon fa-lg"
                                            :icon="item.icon"></fa>
                                        {{ item.label }}
                                    </router-link>
                                </el-menu-item>

                            </div>
                            <hr style="border-top: 2px;">

                            <el-menu-item>
                                <div @click="toResume"
                                    style="width:100%;"><span>Resume
                                        <fa class="icon fa-lg"
                                            icon="fa-solid fa-arrow-up-right-from-square"></fa>
                                    </span>
                                </div>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </div>

            </nav>
        </div>

    </header>
</template>



<script lang="ts" setup>
import { ref, reactive, onMounted, Transition } from 'vue'



const activeIndex = ref('0')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


const toResume = () => {
    // window.open("https://adrian-tam.notion.site/KaYeungAdrian-Tam-fa57862230114d8b88709b1c5c616e3f", "_blank");
    window.open("https://firebasestorage.googleapis.com/v0/b/kayeungadriantam.appspot.com/o/Resume.pdf?alt=media&token=1e2e8cd8-5357-4aad-bce0-43ac581fa9bc", "_blank");
}

let items = reactive([
    { label: "About Me", icon: "fa-solid fa-user", path: "/about-me" },
    { label: "Porjects", icon: "fa-solid fa-rectangle-list", path: "/projects" },
    { label: "Timeline", icon: "fa-solid fa-timeline", path: "/timeline" },
])


</script>

<style scoped>
@import "../assets/css/header.css";
</style>
