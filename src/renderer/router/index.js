import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/bankday',
      name: 'bankday',
      component: require('@/components/BankDay').default
    },
    {
      path: '/stockdetail',
      name: 'stockdetail',
      component: require('@/components/StockDetail').default
    },
    
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/test',
      name: 'eleui',
      component: require('@/components/Ele').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
