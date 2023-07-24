<script>
import Sidebar from '@/cmps/Sidebar.vue'
export default {

  data() {
    return {
    }
  },
  computed: {
  },
  components: {
    Sidebar
  },
  created() {
  },
  methods: {
   
  }
}
</script>

<template>
  <main class="board-index">
    <header>header stuff with log out</header>
    <h1>BOARD TITLE</h1>
    <Sidebar />
    <nav class="board-nav">
      <RouterLink to="/board/">Table</RouterLink>
      <RouterLink to="/board/kanban">Kanban</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>


