import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Gpt from '@/views/layout/gpt'
import Owner from '@/views/layout/owner'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/gpt', component: Gpt },
      { path: '/owner', component: Owner }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
