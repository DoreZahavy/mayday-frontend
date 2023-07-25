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
    <Sidebar/>
    <section class="board-container">
      <section class="board-nav">
        <h1>BOARD TITLE</h1>
        <nav class="board-nav">
          <RouterLink to="/board/">Table</RouterLink>
          <RouterLink to="/board/kanban">Kanban</RouterLink>
        </nav>
      </section>
      <RouterView/>
    </section>
  </main>
</template>


