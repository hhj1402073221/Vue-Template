<template>
  <div class="store">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>vuex测试</el-breadcrumb-item>
    </el-breadcrumb>
     <el-divider></el-divider>
    <p>{{doGetCount}}</p>
    <el-button @click="handleIncrement">
      <strong>+</strong>
    </el-button>
    <el-button @click="handleDecrement">
      <strong>-</strong>
    </el-button>
     <el-divider></el-divider>
    <h3>{{doGetShow}}</h3>
    <el-input placeholder="请输入内容" v-model="obj" @change="changObj" clearable></el-input>
    <div>
        <a href="" @click.prevent="flag=true">登录</a>
        <a href="" @click.prevent="flag=false">注册</a>
        <transition mode="out-in">
            <login v-if="flag"></login>
            <register v-else></register>
        </transition>

        <a href="" @click.prevent="comName='login'">登录</a>
        <a href="" @click.prevent="comName='register'">注册</a>
        <transition mode="out-in">
            <component :is="comName"></component>
        </transition>

        <div class="test">
          <p>1.样式测试</p>
        </div>
        <hr />
          <div class="myDiv"></div>
        <el-divider></el-divider>
        <div>
          <h1>我是父组件--{{msg}}</h1>
          <child :parMsg="msg" @func="toShow"></child>
        </div>
        <div>
          <input type="button" value="跳转到穿梭框" @click="linkTransfer">
          <input type="button" value="跳转到转盘时钟" @click="linkClock">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      obj: "",
      flag: true,
      show: true,
      msg: '这是父组件',
      comName: "login"
    };
  },
  computed: {
    doGetCount () {
      return this.$store.getters.doGetCount
    },
    doGetShow () {
      return this.$store.getters.doGetShow
    }
  },
  methods: {
    handleIncrement() {
      this.$store.commit("increment");
    },
    handleDecrement() {
      this.$store.commit("decrement");
    },
    changObj() {
      this.$store.commit("changTxt", this.obj);
    },
    toShow(data){
      this.msg = data;
    },
    linkTransfer(){
      this.$router.push({
        path: '/transfer',
        name: 'clock',
        query: {id:1, name:'hhj'}
      });
    },
    linkClock(){
      this.$router.push({
        name: 'clock',
        params: {id:1, name:'hhj'}
      });
    }
  },
  components:{
      "login":{
        template:"<h1>这是一个登录LOGIN组件</h1>"
      },
      "register": {
        template: "<h3>这是一个注册组件</h3>"
      },
      "child":{
        props:['parMsg'],
        data(){
          return {
            args: '子组件传的值---666'
          }
        },
        template: ` 
          <div>
            <h3>父组件传来的值--{{parMsg}}</h3>
            <input type="button" value="调用父组件的方法" @click="myclick">
          </div>
        `,
        methods:{
          myclick(){
            this.$emit('func', this.args);
          }
        }
      }
  }
};
</script>

<style>
  .v-enter,
  .v-leave-to{
    opacity: 0;
    transform: translateX(150px);
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 1s ease;
  }

  .test{
    width: 400px;
    border: 1px solid red;
  }
  .test p{
    width: auto;
    text-align: center;
    margin-left: 100px;
    margin-right: 100px;
    background-color: bisque;
  }
  
  .myDiv
  {
    width:100px;
    height:100px;
    background:red;
    position:relative;
    animation:myfirst 5s infinite;
    animation-direction:normal;
  }

  @keyframes myfirst
  {
    0%   {background:red; left:0px; top:0px;}
    25%  {background:yellow; left:calc(100% - 100px); top:0px;}
    50%  {background:blue; left:calc(100% - 100px); top:0px;}
    75%  {background:green; left:0px; top:0px;}
    100% {background:red; left:0px; top:0px;}
  }
</style>
