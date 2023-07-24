import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import BoardIndex from '@/pages/BoardIndex.vue'
import Table from '@/cmps/Table.vue'
import Kanban from '@/cmps/Kanban.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/board',
      name: 'BoardIndex',
      component: BoardIndex,
      children: [
        {
          path: '',
          name: 'Table',
          component: Table,
        },
        {
          path: 'kanban',
          name: 'Kanban',
          component: Kanban,
        },
      ]
    },

  ]
})

export default router
