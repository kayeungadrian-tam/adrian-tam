<template lang="">
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topboder">
          <el-row>
            <el-col :span="8">
              <div class="topbox">Project 3</div>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="12"
              ><div class="top-right">Dynamics Bicycle Model Simulation</div>
            </el-col>
          </el-row>
        </div>
      </el-header>
    </el-container>

    <img src="../../assets/projects/thumbnails/dbm_simulation.png" />
    <h4>Keywords: OBS, OpenCV, Mediapipe</h4>

    <div class="main">
      <h1>Problem Statement</h1>
      <p>
        While inverstigating the possibility of applying machine learning algorithms to dynamics bicycle model,
        a better visualization of the model is required. 
      </p>
      <h1>Solution</h1>
      <p>
      </p>
      <p>
      </p>
      <h1>In the future...</h1>
      <p>
      </p>
    </div>
        <div class="repo"><a href="https://github.com/YomamaBanana/Dynamics_Bicycle_Model" target="_blank">
          Github repo
                  <fa
          class="icon"
          :icon="{ prefix: 'fab', iconName: 'github-square' }"
        />
          </a>
        </div>
  </div>
</template>

<style scoped>

h4{
    font-style: italic;
}
.icon {
  position: absolute;
  font-size: 1.5rem;
  margin-top: -5px;
  margin-left: 5px;
}

a{
  color: #7c795d;
  text-decoration: none;
  -webkit-transition: all 0.2s ease-in-out;
}

a:hover{
  color: rgba(22, 19, 48, 0.652);
  text-shadow: 0 0 10px rgba(20, 20, 20, 0.652);
}

.repo{
  margin-top: 10px;
  color: #7c795d;
  vertical-align: middle;
  text-align: center;
}

@media (max-width: 992px) {
img {
  width: 500px;
  height: auto;
  padding: 20px;
}
}
@media (min-width: 992px) {
  img {
  width: 720px;
  height: auto;
  padding: 20px;
}
}
p {
  font-size: 16px;
  line-height: 26px;
  text-indent: 20px;
  margin: 0;
  padding-bottom: 10px;
}

.main {
  padding: 20px;
  text-align: left;
}

h1 {
  align-self: left;
  color: #7c795d;
  font-family: "Trocchi", serif;
  font-size: 1.8rem;
  font-weight: weight;
  line-height: 48px;
  margin: 0;
  text-shadow: 1px 1px 0 #fff;
  text-decoration: underline 1px;
}
.common-layout {
  padding: 1% 20px 3% 20px;
  margin: 0 20px 0 20px;
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  min-height: 100vh;
}

.top-right {
  right: 0;
  font-size: 1.3rem;
  line-height: 50px;
  text-align: right;
  padding-right: 15%;
}

.topboder {
  border-top: 2mm solid #cef576;
  height: 10px;
  margin-top: -8px;
}

.topbox {
background-color: #84fb95;
background-image: linear-gradient(315deg, #84fb95 0%, #cef576 74%);
  height: 50px;
  line-height: 50px;
  margin-top: -2px;

}
</style>

<script>
export default {
  name: "ProjectThree",
};
</script>
<style lang=""></style>
