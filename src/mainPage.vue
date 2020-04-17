<template>
  <div class="main-page">
    <div class="head"></div>
    <div class="side-bar">
      <Menu :theme="theme" :active-name="active" class="side-menu">
        <Menu-item name="/mainPage/hello" to="/mainPage/hello">
          <Icon size="16" type="ios-paper" />
          hello
        </Menu-item>
        <Menu-item name="/mainPage/web-worker" to="/mainPage/web-worker">
          <Icon size="16" type="ios-people" />
          测试webWorker
        </Menu-item>
        <Menu-item name="/mainPage/d3" to="/mainPage/d3">
          <Icon size="16" type="ios-stats" />
          D3
        </Menu-item>
      </Menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

    <div class="footer">
      2020 © Eden
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data() {
    return {
      theme: "light",
      active: this.$route.path,
    };
  },
};
</script>

<style lang="less" scoped>
.main-page {
  .head {
    width: 100%;
    height: 60px;
    background-color: #233156;
  }

  .side-bar {
    border: 1px solid #e8ecf0;
    margin: 20px 0 0 20px;
    width: auto;
    float: left;

    .side-menu {
      height: 820px;
      text-align: left;
    }
  }

  .content {
    height: 820px;
    background-color: white;
    border: 1px solid #e8ecf0;
    margin: 20px 20px 0 280px;
    padding: 20px 0 0 0;
  }

  .footer {
    width: 100%;
    height: 60px;
    float: left;
    margin: 0 0 0 0;
    padding: 20px 0 0 0;
  }
}
</style>
