<template>
  <el-row :gutter="0">
    <el-col :span="5"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="14">
      <div class="card">
        <el-card style="width: 305px" class="info card-mobiles" shadow="hover">
          <h3>{{ user.name }}</h3>
          <div class="data">
            <span
              >{{ user.email }}
              <el-button
                class="button"
                style="border: 0px; width: 10px; margin-left: 0"
                @click="copy"
                round
              >
                <el-icon :size="12" circle>
                  <CopyDocument />
                </el-icon>
              </el-button>
            </span>
          </div>
          <div class="data"></div>
          <div class="data">
            <strong class="sub-title"></strong> {{ user.city }}
          </div>
          <div class="data">
            <!-- <strong class="sub-title"></strong> {{ user.lang }} -->
            <el-tooltip
              class="box-item"
              effect="dark"
              content="English"
              placement="top-start"
            >
              <country-flag class="flag" country="nz" size="normal" />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Japanese"
              placement="bottom"
            >
              <country-flag class="flag" country="jp" size="normal" />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Chinese (Mandarin)"
              placement="top-start"
            >
              <country-flag class="flag" country="cn" size="normal" />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Cantonese"
              placement="bottom"
            >
              <country-flag class="flag" country="hk" size="normal" />
            </el-tooltip>
          </div>
          <div>
            <IconComponent />
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="5"><div class="grid-content bg-purple" /></el-col>
  </el-row>
</template>

<script setup>
import { CopyDocument } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
</script>

<script>
// import SocialBar from './SocialBar.vue'
import IconComponent from "@/components/Utils/Icons.vue";

export default {
  name: "CardComponent",
  props: ["user", "links"],
  components: {
    IconComponent,
  },
  methods: {
    copy() {
      navigator.clipboard.writeText("tamkayeung.adrian@gmail.com");
      this.copyMessage();
    },
    copyMessage() {
      ElMessage({
        message: "Email address copied to clipboard.",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.flag {
  /* font-size: 2rem; */
  padding: 5px;
  border: 1px solid #ccc;
}

.flag:hover {
  border: 1px solid #000;
}

.button:focus {
  background-color: white;
  color: inherit;
}

@media (max-width: 768px) {
  .card {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .info {
    justify-content: center;
  }
  .info .data {
    margin-bottom: 15px;
    text-align: center;
    font-size: 0.9rem;
  }
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    text-decoration: underline;
  }
}

@media (min-width: 768px) {
  .info .data {
    /* max-width: 500px; */
    margin-bottom: 12px;
    text-align: left;
  }
  h3 {
    margin-bottom: 1.5rem;
    text-decoration: underline;
  }
}
</style>
