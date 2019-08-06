<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>走马灯</el-breadcrumb-item>
    </el-breadcrumb>
     <el-divider></el-divider>
    <el-carousel height="543px">
      <el-carousel-item v-for="url in urls" :key="url.id">
          <img :src="url.src" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
        urls: [
            {id: 1, src: require('../assets/1.jpg')},
            {id: 2, src: require('../assets/2.jpg')},
            {id: 3, src: require('../assets/3.jpg')},
            {id: 4, src: require('../assets/4.jpg')}
        ]
    };
  },
  created: function(){
    console.log('/传值',this.$route.params.id, this.$route.params.name);
  }
};
</script>

<style>
.el-carousel__item {
  text-align: center;
  color: #475669;
  font-size: 50px;
  opacity: 0.75;
  line-height: 500px;
}
</style>

