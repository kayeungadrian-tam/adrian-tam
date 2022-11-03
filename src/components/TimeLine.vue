<template>
    <!-- <div class="timelinepage"> -->
    <div class="title">
        <h1>Timeline</h1>
    </div>
    <div class="timeline">
        <el-timeline>
            <div v-for="(item, i ) in timeline">
                <el-timeline-item class="test"
                    :key="item.timestamp"
                    :timestamp="item.timestamp"
                    :hide-timestamp="true"
                    icon="arrow-right"
                    color="#ec9704"
                    center
                    placement="top">
                    <el-card :class="i % 2 == 0 ? 'dark' : 'light'">
                        <el-row>
                            <el-col :span="2"
                                class="TimelineCard">
                                <fa :icon="item.icon"
                                    class="headicon" />
                            </el-col>
                            <el-col :span="16">

                                <div class="cardHeader">
                                    <h2>{{ item.title }}</h2>
                                    <h4>@ {{ item.location }}
                                        <el-link :href="item.website"
                                            :underline="false"
                                            target="blank">
                                            <fa class="new-browser"
                                                icon="fa-solid fa-arrow-up-right-from-square" />
                                        </el-link>
                                    </h4>
                                    <p style="font-size: 1.2em;"
                                        v-html="item.description">
                                    </p>
                                </div>
                            </el-col>
                            <el-col class="timeSymbol"
                                :span="6">
                                {{ item.end }} <br> ~ <br> {{ item.start }}
                            </el-col>
                        </el-row>
                    </el-card>
                </el-timeline-item>
            </div>
        </el-timeline>
    </div>
    <!-- </div> -->


</template>



<script lang="ts" setup>

import timeline from "../data/timeline";

</script>


<style scoped>
@import "../assets/css/timeline.css";
</style>