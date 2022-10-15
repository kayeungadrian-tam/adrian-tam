<template>
    <div class="timelinepage">
        <h1>Timeline</h1>
        <hr>

        <el-timeline>
            <el-timeline-item class="test"
                v-for="item in timeline"
                :key="item.timestamp"
                :timestamp="item.timestamp"
                :hide-timestamp="true"
                center
                placement="top">
                <el-card>
                    <el-row>
                        <el-col :span="2"
                            class="TimelineCard">
                            <fa :icon="item.icon"
                                class="headicon" />
                        </el-col>
                        <el-col :span="16">

                            <div class="cardHeader">
                                <h2>{{item.title}}</h2>
                                <h4>@ {{item.location}}
                                    <el-link :href="item.website"
                                        :underline="false"
                                        target="blank">
                                        <fa class="new-browser"
                                            icon="fa-solid fa-arrow-up-right-from-square" />
                                    </el-link>
                                </h4>
                            </div>
                            <p style="font-size: 1.2em;"
                                v-html="item.description">
                            </p>
                        </el-col>
                        <el-col class="timeSymbol"
                            :span="6">
                            {{item.end}} <br> ~ <br> {{item.start}}
                        </el-col>
                    </el-row>
                </el-card>
            </el-timeline-item>

        </el-timeline>
    </div>


</template>



<script lang="ts" setup>

import timeline from "../data/timeline";

</script>


<style scoped>
@import "../assets/css/bubbles_bg.css";

.timeSymbol {
    font-size: 1.5rem;
    color: #EC901493;
    text-align: right;
}


.new-browser {
    color: grey;
    cursor: pointer;
    padding: 0 10px 0 10px;
}



.TimelineCard {
    display: flex;
    flex-direction: column;
    /* vertical-align: middle; */
    /* right: 0; */
    align-items: center;
    padding-right: 15px;
    /* background-color: red; */
    -ms-transform: translateY(30%);
    transform: translateY(30%);
}

.headicon {
    font-size: 2.2rem;
    color: #80400b;
}

.timelinepage {
    padding: 0% 20% 0 20%;
    overflow: scroll;
    height: 90vh;
}

.test {

    /* display: inline-flex; */
    /* padding: 20px 0 0 0; */
    text-align: left;
    /* width: 750px; */
    right: 0;
}
</style>