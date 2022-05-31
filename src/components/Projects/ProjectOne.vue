<template lang="">
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topboder">
          <el-row>
            <el-col :span="8">
              <div class="topbox">HERE</div>
            </el-col>
            <el-col :span="8">HERE</el-col>
            <el-col :span="8"><div class="top-right">Project 1</div> </el-col>
          </el-row>
        </div>
      </el-header>
    </el-container>
    <div class="main">
      <el-row>
        <el-col :span="12">HERE</el-col>
        <el-col :span="12"><div class="">Project 1</div> </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 20px;
  background: blue;
  height: 100vh;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #2b4162;
  width: 100%;
}

.common-layout {
  padding: 1% 20px 3% 20px;
  border: 1px solid red;
  margin: 0 20px 0 20px;
}

.top-right {
  right: 0;
  font-size: 2rem;
  line-height: 50px;
  text-align: right;
  padding-right: 20%;
}

.topboder {
  border-top: 5px solid grey;
  height: 10px;
  margin-top: -5px;
}

.topbox {
  background: grey;
  height: 50px;
}
</style>

<script>
export default {
  name: "ProjectOne",
};
</script>
<style lang=""></style>
