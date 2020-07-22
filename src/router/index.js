import Vue from 'vue'
import Router from 'vue-router'
//import Pos from '@/components/page/Pos'
import mangae from '@/components/page/manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mangae',
      component: mangae
    }
  ]
})
