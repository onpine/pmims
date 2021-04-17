<template>
  <div class="layout-container">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="inline"
          :defaultOpenKeys="openKeys"
          :default-selected-keys="[$route.path]"
        >
          <a-sub-menu key="/pmim">
            <span slot="title">
              <a-icon type="team" /> <span>党员管理</span></span
            >
            <a-menu-item key="/pmim/all" @click="change('/pmim/all')">
              <a-icon type="team" />
              <span>党员信息管理</span>
            </a-menu-item>
            <template v-for="(item, index) in branchs">
              <a-menu-item
                :key="'/pmim/' + item"
                @click="change('/pmim/' + item)"
              >
                <a-icon type="team" /> <span>{{ item }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>

          <a-menu-item key="/activity" @click="change('/activity')">
            <a-icon type="user-add" />
            <span>活动管理</span>
          </a-menu-item>
          <a-menu-item key="/fee" @click="change('/fee')">
            <a-icon type="upload" />
            <span>党费管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <span>党员信息管理</span>
          <a-dropdown
            style="float: right; margin-right: 20px"
            placements="bottomCenter"
          >
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              {{ id }}<a-icon type="down" />
            </a>
            <a-menu slot="overlay" style="text-align: center">
              <a-menu-item>
                <a href="javascript:;" @click="handleLogout()">登出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { logout, getBranchs } from "../api/index.ts";
import { getStorage } from "../utils/storage.ts";
export default {
  name: "layoutContainer",
  components: {},
  props: {},
  data() {
    return {
      collapsed: false,
      id: "",
      branchs: [],
      openKeys: ["/pmim"],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.id = getStorage("id");
  },
  mounted() {
    this.loadBranchs();
  },
  methods: {
    change(path) {
      this.$router.push(path);
    },
    handleLogout() {
      const key = "logout";
      logout(getStorage("id"))
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "退出成功!", key, duration: 2 });
            this.$router.push({ path: "/login" });
          } else {
            this.$message.warning({ content: "退出异常!", key, duration: 2 });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadBranchs() {
      getBranchs()
        .then((res) => {
          this.branchs = [...res.data.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
