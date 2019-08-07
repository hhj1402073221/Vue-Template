<template>
  <div id="app">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="el-menu-header">欢迎来到这里！</div>
        <el-menu default-active="/" :router="true">
            <el-menu-item index="/table?id=1&name=hhj">表格</el-menu-item>
            <el-menu-item index="/carousel/1/hhj">走马灯</el-menu-item>
            <el-menu-item index="/transfer">穿梭框</el-menu-item>
            <el-menu-item index="/test">vuex测试</el-menu-item>
            <el-menu-item index="/clock">轮盘时钟</el-menu-item>
          </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <span>{{year}}年{{month}}月{{date}}日 星期{{day}} {{time}}</span>
          <i class="el-icon-setting" style="font-size: 20px"></i>
          <span>hhj</span>
        </el-header>

        <!-- 模块内容 -->
        <el-main>
          <!-- 路由 -->
          <keep-alive>
            <router-view class="view"></router-view>
          </keep-alive>
        </el-main>

        <!-- 尾部 -->
        <el-footer>@copyright</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const days = ['一', '二', '三', '四', '五', '六', '天'];
var icnow = new Date();
var interval;
export default {
  name: 'app',
  data() {
    return {
      year: icnow.getFullYear(),
      month: icnow.getMonth() + 1,
      date: icnow.getDate(),
      day: days[icnow.getDay() - 1],
      time: icnow.toTimeString().substring(0, 8)
    }
  },
  created () {
    interval = setInterval(() =>{
      let icnow = new Date();
        this.year = icnow.getFullYear();
        this.month = icnow.getMonth() + 1;
        this.date = icnow.getDate();
        this.day = days[icnow.getDay() - 1];
        this.time = icnow.toTimeString().substring(0, 8);
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(interval);
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  color: #333;
}

.el-container {
  height: 100vh;
}

.el-menu-header {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
  border-bottom: 1px solid #e6e6e6;
}

.el-header {
  text-align: right;
  font-size: 20px;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-footer {
  text-align: center;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
