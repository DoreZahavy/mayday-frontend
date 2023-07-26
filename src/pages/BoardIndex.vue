<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
export default {

  data() {
    return {
      title:''
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    boardTitle() {
      return this.$store.getters.boardTitle
    },
  },
  components: {
    Sidebar,
    InPlaceEdit
  },
  mounted() {
  },
  methods: {

  },
  watch: {
    // boardTitle() {
    //   this.$emit('', this.boardTitle)

    // },
  }
}
</script>

<template>
  <main class="board-index">
    <Sidebar />
    <section class="board-container">
      <section class="board-nav">
        <!-- <InPlaceEdit v-model="boardTitle" /> -->

        <h1 class="board-title">{{ boardTitle }}</h1>

        <nav class="board-nav">
          <RouterLink to="/board/">Table</RouterLink>
          <RouterLink to="/board/kanban">Kanban</RouterLink>
        </nav>
      </section>
      <RouterView />
    </section>
  </main>
</template>


