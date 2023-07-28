<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import BoardHeader from '@/cmps/BoardHeader.vue'
import MainHeader from '@/cmps/MainHeader.vue'

import { svgService } from '../services/svg.service'
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
    BoardHeader,
    MainHeader
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
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  watch: {
    // boardTitle() {
    //   this.$emit('', this.boardTitle)

    // },
  }
}
</script>

<template>
  <main class="main-layout">
    <MainHeader />
    <Sidebar />
    <section class="board-container">
      <BoardHeader :miniBoard="miniBoard" @update="updateBoard" />

      <nav class="board-nav">

        <RouterLink :to="'/board/' + boardId" class="nav-item">
          <span v-html="getSvg('homeSml')"></span>
          Table
        </RouterLink>
        <RouterLink :to="'/board/' + boardId + '/kanban'" class="nav-item">Kanban</RouterLink>
      </nav>

      <RouterView />
    </section>
  </main>
</template>


