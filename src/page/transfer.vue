<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>穿梭框</el-breadcrumb-item>
    </el-breadcrumb>
     <el-divider></el-divider>
    <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="data"
    ></el-transfer>
  </div>
</template>

<script>
export default {
  name: "Transfer",
  data() {
    const generateData = _ => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu"
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
    };
  },
  created: function(){
     console.log(this.$route);
    console.log('页面跳转问号传值',this.$route.query.id, this.$route.query.name);
  },
};
</script>

