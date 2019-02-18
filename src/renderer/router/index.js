import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta:{
        title:'首页'
      },
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/bankday',
      meta:{
        title:'金额日记帐'
      },
      name: 'bankday',
      component: require('@/components/BankDay').default
    },
    {
      path: '/stockdetail',
      meta:{
        title:'数量明细帐'
      },
      name: 'stockdetail',
      component: require('@/components/StockDetail').default
    },    
    {
      path: '/landing',
      meta:{
        title:'landing'
      },
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/test',
      meta:{
        title:'控件测试'
      },
      name: 'eleui',
      component: require('@/components/Ele').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
