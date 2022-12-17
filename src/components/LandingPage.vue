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
                An engineer excited to get better <span class="and">&</span> solve problems!
            </h2>
            <div class="buttons">

                <div>
                    <el-button @click="$router.push('about-me')"
                        size="large"
                        round>
                        <fa class="icon"
                            icon="fa-solid fa-user" />
                        About
                    </el-button>
                </div>

                <div>
                    <el-button @click="$router.push('projects')"
                        round>
                        <fa class="icon"
                            icon="fa-solid fa-rectangle-list" />
                        Projects
                    </el-button>
                </div>
                <div>
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


.and {
    color: #80400b;
    font-size: 2.3rem;
}


.buttons {
    display: flex;
    justify-self: space-around;
}



.landingpage {
    /* width: 100%; */
    height: calc(100vh - 100px);

    /* position: absolute; */
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
}


@media (max-width: 800px) {

    .landingpage {

        height: calc(100vh - 100px);


    }

    .landingpage h1 {
        font-size: 2rem;
        line-height: 50px;
    }

    .landingpage h2 {
        padding: 0 40px;
        word-wrap: break-word;
        font-size: 1em;
        /* line-height: 50px; */
    }



    .landingpage .and {
        font-size: 1.3em;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        justify-self: space-around;
        margin-left: auto;
        margin-right: auto;
    }



}
</style>
