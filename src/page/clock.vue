<template>
  <div class="app">
    <h2>轮盘时钟</h2>
    <div
      v-for="s in 60"
      class="s"
      :key="s"
      :style="{transform:'translate('+380*Math.cos((s+second)*Math.PI/30)+'px,'+380*Math.sin((s+second)*Math.PI/30)+'px)'}"
    >{{60-s}}秒</div>
    <div
      v-for=" i in 60"
      class="i"
      :key="i * -1"
      :style="{transform:'translate('+330*Math.cos((i+minute)*Math.PI/30)+'px,'+330*Math.sin((i+minute)*Math.PI/30)+'px)'}"
    >{{60-i}}分</div>
    <div
      v-for="h in 24"
      class="h"
      :key="h * -100"
      :style="{transform:'translate('+280*Math.cos((hour+h)*Math.PI/12)+'px,'+280*Math.sin((hour+h)*Math.PI/12)+'px)'}"
    >{{24-h}}时</div>
    <div
      v-for="w in 7"
      class="w"
      :key="w * 100"
      :style="{transform:'translate('+220*Math.cos(2*(w+week)*Math.PI/7)+'px,'+220*Math.sin(2*(w+week)*Math.PI/7)+'px)'}"
    >星期{{zw[7-w]}}</div>
    <div
      v-for="d in 31"
      class="d"
      :key="d * -10000"
      :style="{transform:'translate('+170*Math.cos(2*(d+day-1)*Math.PI/31)+'px,'+170*Math.sin(2*(d+day-1)*Math.PI/31)+'px)'}"
    >{{32-d}}日</div>
    <div
      v-for="m in 12"
      class="m"
      :key="m * 1000"
      :style="{transform:'translate('+90*Math.cos((month+m)*Math.PI/6)+'px,'+90*Math.sin((month+m)*Math.PI/6)+'px)'}"
    >{{13-m}}月</div>
    <div class="y">{{year}}年</div>
  </div>
</template>

<script>
var interval;  // 定义全局定时器，用于清除定时器
export default {
  name: "Clock",
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      week: 0,
      hour: 0,
      minute: 0,
      second: 0,
      zw: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  created() {
    console.log('====================创建轮盘时钟定时器========================');
    interval = setInterval(() => {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.day = date.getDate();
      this.week = date.getDay();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
      this.second = date.getSeconds();
    }, 1000);
    console.log(this.$route);
    console.log('页面跳转/传值',this.$route.params.id, this.$route.params.name);
  },
  beforeDestroy () {
    console.log('====================清除轮盘时钟定时器========================');
    clearInterval(interval);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.app {
  position: relative;
  font-family: 微软雅黑;
}
/* h2 {
  text-align: center;
} */
.s,
.i,
.h,
.d,
.w,
.m,
.y {
  position: absolute;
  top: 360px;
  left: 660px;
  transition: transform 1s;
  text-shadow: 1px 1px 2px #000;
}
.y {
  left: 645px;
  top: 357px;
  font-weight: bold;
  font-size: 20px;
}
.m {
  color: blueviolet;
}
.d {
  color: darkorange;
}
.w {
  color: cornflowerblue;
}
.h {
  color: #f34416;
}
.i {
  color: crimson;
}
.s {
  color: darkseagreen;
}
</style>
