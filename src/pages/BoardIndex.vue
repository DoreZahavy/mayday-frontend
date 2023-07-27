<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import BoardHeader from '@/cmps/BoardHeader.vue'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {

  data() {
    return {
      title: ''
    }
  },
  computed: {
    miniBoard() {
      return this.$store.getters.miniBoard
    },
    boardTitle() {
      return this.$store.getters.boardTitle
    },
    boardId() {
      return this.$route.params.boardId
    },
  },
  components: {
    Sidebar,
    InPlaceEdit,
    BoardHeader
  },
  mounted() {
  },
  methods: {
    async updateBoard({ prop, toUpdate }) {
      try {
        await this.$store.dispatch({ type: 'updateBoard', prop, toUpdate })
        showSuccessMsg('board Updated')

      } catch (err) {
        showErrorMsg('Failed to update Board')
      }
    }
  },
  watch: {
    // boardTitle() {
    //   this.$emit('', this.boardTitle)

    // },
  }
}
</script>

<template>
  <Sidebar />
  <main class="board-container">
    <section class="board-nav">
      <BoardHeader :miniBoard="miniBoard" @update="updateBoard" />
      <nav class="board-nav">
        <RouterLink :to="'/board/' + boardId" class="nav-item">Table</RouterLink>
        <RouterLink :to="'/board/' + boardId + '/kanban'" class="nav-item">Kanban</RouterLink>
      </nav>
    </section>
    <RouterView />
  </main>
</template>


