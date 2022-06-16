<template lang="">
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topboder">
          <el-row>
            <el-col :span="8">
              <div class="topbox">Project 2</div>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="12"
              ><div class="top-right">Infinite Virtual Webcam Loop</div>
            </el-col>
          </el-row>
        </div>
      </el-header>
    </el-container>

    <img src="../../assets/projects/thumbnails/infinite_virtual_web_loop.png" />

    <div class="main">
      <h1>Problem Statement</h1>
      <p>
        Online meeting has become a common practice in the industry, however, someimes 
        you just want to sit back, relax, and all the while still pretend you are paying attention.
        Aa result, a solution was needed for them boring meetings held online.
      </p>
      <h1>Solution</h1>
      <p>
        A virtual webcam loop was developed in python to record a video and then play it on repeat. 
        Such recording is then sent to a virtual webcam, which in turn can be used for online meetings. 
        Ultimately, this program provides a way for the user to record themself, play it back and pretend
        they are still listening. 
      </p>
      <p>
        Furthermore, it uses facial landmarks detection to provide a metric to help the user to make a smmoth
        transition between the on-repeat video and the real time frame. 
      </p>
      <h1>In the future...</h1>
      <p>
        A desktop application for this program would be a good idea for better UX. At the same time, 
        web-based solution such as Chrome Extension would also be an excellent idea.
      </p>
    </div>
        <div class="repo"><a href="https://github.com/YomamaBanana/OpenCV-for-Web" target="_blank">
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

.icon {
  font-size: 1.5rem;
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


img {
  width: 500px;
  height: auto;
  padding: 20px;
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
  border-top: 2mm solid #77eed8;
  height: 10px;
  margin-top: -8px;
}

.topbox {
background-color: #9eabe4;
background-image: linear-gradient(315deg, #9eabe4 0%, #77eed8 74%);
  height: 50px;
  line-height: 50px;
  margin-top: -2px;

}
</style>

<script>
export default {
  name: "ProjectTwo",
};
</script>
<style lang=""></style>
