//creatRouter: create router instance
//creatWebHistory: create history model router

import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/Login/index.vue"
import Layout from "@/views/Layout/index.vue"
import Home from "@/views/Home/index.vue"
import Category from "@/views/Category/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //relation of path and component
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',//default
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
