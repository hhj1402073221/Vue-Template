import Vue from 'vue';
import Router from 'vue-router';
/**
 * 定义 (路由) 组件，可以从其他文件 import 进来
 */
import Table from '../page/Table';
import Carousel from '../page/Carousel';
import Transfer from '../page/Transfer';
import Test from '../page/Test';
import HomePage from '../page/HomePage';
import Clock from '../page/Clock'

/**
 * 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
 */
Vue.use(Router)

/**
 * 定义路由
 * 每个路由应该映射一个组件。 其中"component"
 *  可以是通过 Vue.extend() 创建的组件构造器，
 */
var routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/carousel/:id/:name',
    name: 'carousel',
    component: Carousel
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Transfer
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/clock',
    name: 'clock',
    component: Clock
  }
];

/**
 * 创建 router 实例，然后传 `routes` 配置
 */
export default new Router({
  routes // (缩写) 相当于 routes: routes
})