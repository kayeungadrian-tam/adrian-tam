<template lang="">
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topboder">
          <el-row>
            <el-col :span="8">
              <div class="topbox">Project 4</div>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="12"
              ><div class="top-right">Reinforcement Learning PoC</div>
            </el-col>
          </el-row>
        </div>
      </el-header>
    </el-container>

    <img
      src="https://user-images.githubusercontent.com/51869912/121030198-3aeccb00-c7e4-11eb-9684-cd6535d02638.gif"
    />
    <h4>Keywords: Tensorflow, RL, Object Avoidance, PoC</h4>

    <div class="main">
      <h1>Problem Statement</h1>
      <p>
        A little PoC project is needed to showcase that Reinforcement Learning
        can help a vehicle to avoid obstacles and give it an ability to pursuit
        a desired object.
      </p>
      <h1>Solution</h1>
      <p>
        A game-like environment is first set up to simulate a real-world
        environment. An agent, the rocket, and obstacles, the walls, are then
        constructed within the said environment. RL model is then trained with
        Keras locally on CPU for 1500 epochs with a custom reward function. The
        model is then applied to the agent in a new environment.
      </p>
      <p>
        Furthermore, it uses facial landmarks detection to provide a metric to
        help the user to make a smmoth transition between the on-repeat video
        and the real time frame.
      </p>
      <h1>In the future...</h1>
      <p>
        A lot more can be done with this simulation. Namely a more complex
        environment to achieve a more complex goal, a comparsion between
        different RL algorithms.
      </p>
    </div>
    <div class="repo">
      <a
        href="https://github.com/YomamaBanana/Reinforcement_Learning"
        target="_blank"
      >
        Github repo
        <fa class="icon" :icon="{ prefix: 'fab', iconName: 'github-square' }" />
      </a>
    </div>
  </div>
</template>

<style scoped>
h4 {
  font-style: italic;
}
.icon {
  font-size: 1.5rem;
}

a {
  color: #7c795d;
  text-decoration: none;
  -webkit-transition: all 0.2s ease-in-out;
}

a:hover {
  color: rgba(22, 19, 48, 0.652);
  text-shadow: 0 0 10px rgba(20, 20, 20, 0.652);
}

.repo {
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
  border-top: 2mm solid #eccc68d3;
  height: 10px;
  margin-top: -8px;
}

.topbox {
  background-color: #d3d3d3;
  background-image: linear-gradient(315deg, #d3d3d3 0%, #eccc68 74%);
  height: 50px;
  line-height: 50px;
  margin-top: -2px;
}
</style>

<script>
export default {
  name: "ProjectFour",
  methods: {},
};
</script>
<style lang=""></style>
