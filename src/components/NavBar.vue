<template>
    <nav>
        <el-menu :router="true"
            :default-active="activeIndex"
            menu-trigger="hover"
            text-color="Black"
            class="el-menu-demo transbackground"
            mode="horizontal"
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
                        <div class="icons"
                            @click="$router.push(item.path)">
                            <fa class="icon fa-lg"
                                :icon="item.icon"></fa>

                            <span>{{ item.label }}</span>
                        </div>
                    </el-menu-item>

                </div>
                <hr style="border-top: 2px;">

                <el-menu-item>
                    <div @click="toResume"><span>Resume

                        </span>
                    </div>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu>
                <template #title>
                    <el-icon>
                        <Edit />
                    </el-icon>
                </template>

            </el-sub-menu>

        </el-menu>


    </nav>

</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const activeIndex = ref('0')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    // activeIndex.value = keyPath[0]
}


const toResume = () => {
    window.open("https://adrian-tam.notion.site/KaYeungAdrian-Tam-fa57862230114d8b88709b1c5c616e3f", "_blank");
}

let items = reactive([
    { label: "Home", icon: "fa-solid fa-house", path: "/adrian-tam" },
    { label: "About Me", icon: "fa-solid fa-user", path: "/about-me" },
    { label: "Porjects", icon: "fa-solid fa-rectangle-list", path: "/projects" },
    { label: "Timeline", icon: "fa-solid fa-timeline", path: "/timeline" },
])


</script>
  
<style scoped>
.el-menu-demo {
    justify-content: space-between;
}

.icon {
    vertical-align: middle;
    margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
    background-color: rgba(220, 220, 220, 1) !important;
    color: #b88230 !important;
    font-weight: bold;

}

.info-icons {
    width: 20px;
    height: 20px;
    padding: 0 5px 0 5px;
}

.flex-grow {
    flex-grow: 1;
}

.transbackground {
    background-color: transparent;
}
</style>
  