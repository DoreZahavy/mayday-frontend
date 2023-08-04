import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import BoardIndex from '@/pages/BoardIndex.vue'
import LoginSignup from '@/pages/LoginSignup.vue'
import BoardDetails from '@/cmps/BoardDetails.vue'
import Kanban from '@/cmps/Kanban.vue'
import Activities from '@/cmps/Activities.vue'
import Conversations from '@/cmps/Conversations.vue'
import Dashboard from '@/cmps/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/loginsignup',
      name: 'LoginSignup',
      component: LoginSignup
    },
    {
      path: '/board/:boardId?',
      component: BoardIndex,
      children: [
        {
          path: '',
          name: 'BoardDetails',
          component: BoardDetails,
        },
        {
          path: 'kanban',
          name: 'Kanban',
          component: Kanban,
        },
        {
          path:'dashboard',
          name:'Dashboard',
          component: Dashboard
        }
      ]
    },
  ]
})

export default router
