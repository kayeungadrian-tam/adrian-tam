<template>
  <div class="home">
    <div class="common-layout">
      <el-skeleton style="width: 240px">
        <template #template>
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: inline-block;
  align-content: center;
  justify-content: center;
}

.common-layout {
  padding: 1% 20px 3% 20px;
  margin: 0 20px 0 20px;
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  max-width: 1000px;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
