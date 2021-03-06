import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    redirect: '/Login' },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
