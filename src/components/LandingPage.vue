<script setup lang="ts">


</script>

<template>
    <div>
        <div class="landingpage">
            <div class="css-typing">
                <h1>
                    Hi 👏🏼 I'm Adrian,
                </h1>
                <h1>
                    a happy <span class="engineer">engineer</span>
                </h1>
            </div>
            <h2>
                An engineer excited to get better!
            </h2>
            <div class="buttons">
                <el-button @click="$router.push('about-me')"
                    size="large"
                    round>
                    <fa class="icon"
                        icon="fa-solid fa-user" />
                    About
                </el-button>


                <el-button @click="$router.push('projects')"
                    round>
                    <fa class="icon"
                        icon="fa-solid fa-rectangle-list" />
                    Projects

                </el-button>
                <el-link type="info"
                    href="https://github.com/kayeungadrian-tam"
                    target="blank"
                    :underline="false">
                    <el-button round>
                        <fa class="icon"
                            icon="fa-brands fa-github" />
                        Github
                    </el-button>
                </el-link>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');
@import "../assets/css/typewriter.css";


.icon {
    width: 25px;
    height: 25px;
    padding-right: 5px;
}


.buttons .el-button {
    margin-left: 25px;
    width: 120px;
    padding: 20px 5px 20px 5px;
    margin-top: 25px;
}

.engineer {
    background-color: #9C4A1A22;
    color: #EC9704;
    border-radius: 15px;
}

.el-button {
    height: 50px;
    width: 80px;
    font-size: large;
    --el-button-hover-bg-color: #FFFFFFa7;
    --el-button-hover-border-color: #EC9704d3;
}



.landingpage {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5% 0 0 -22%;
}
</style>
