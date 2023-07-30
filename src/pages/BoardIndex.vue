<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import BoardHeader from '@/cmps/BoardHeader.vue'
import MainHeader from '@/cmps/MainHeader.vue'
import BoardInfoModal from '../cmps/BoardInfoModal.vue'
import Activities from '../cmps/Activities.vue'
import Conversations from '../cmps/Conversations.vue'

import { svgService } from '../services/svg.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {

  data() {
    return {
      title: '',
      active: 'table',
      showModal: false,
      showDrawerModal: false,
      showActivitiesContent: false,
      showConversationsContent: false,
      conversationsTaskId: '1234'
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
    MainHeader,
    BoardInfoModal,
    Activities,
    Conversations,
  },
  mounted() {
    document.title = 'Mayday'
    setTimeout(() => {
      document.title = this.$store.getters.boardTitle//TODO: make this less janky, event driven
    }, 600);
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
    toggleModal() {
      this.showModal = !this.showModal
    },
    showActivities() {
      this.showDrawerModal = true
      this.showConversationsContent = false
      this.showActivitiesContent = true
    },
    showConversations() {
      this.showDrawerModal = true
      this.showActivitiesContent = false
      this.showConversationsContent = true
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
  <main class="main-layout">
    <MainHeader />
    <Sidebar />
    <div>
      <button
        style="position: fixed; cursor: pointer; top: 10px; right: 61.8%; border: 1px solid royalblue; border-radius: 5px; background-color: whitesmoke; padding: 5px;"
        @click="showActivities">Open Activities</button>
      <button
        style="position: fixed; cursor: pointer; top: 10px; right: 69.27%; border: 1px solid royalblue; border-radius: 5px; background-color: whitesmoke; padding: 5px;"
        @click="showConversations">Open Conversations</button>

      <transition name="slide">
        <div class="modal" v-if="showDrawerModal">
          <span class="close-button" @click="showDrawerModal = false" v-html="getSvg('xButton')"></span>
          <!-- <h2>Social Media Campaign - #NewRelease</h2> -->
          <Conversations class="modal-content" v-if="showConversationsContent" :taskId="conversationsTaskId">
          </Conversations>
          <Activities class="modal-content" v-else-if="showActivitiesContent"></Activities>
        </div>
      </transition>
    </div>
    <section class="board-container">
      <BoardInfoModal @closeModal="toggleModal" @update="updateBoard" v-if="this.showModal" :miniBoard="miniBoard" />
      <BoardHeader :miniBoard="miniBoard" @update="updateBoard" @toggleModal="toggleModal" />
      <nav class="board-nav">

        <RouterLink :class="{ active: active === 'table' }" @click="active = 'table'" :to="'/board/' + boardId"
          class="nav-item">
          <!-- <span>&#61996</span> -->
          <span v-html="getSvg('homeSml')"></span>Main Table
        </RouterLink>

        <RouterLink :class="{ active: active === 'kanban' }" @click="active = 'kanban'"
          :to="'/board/' + boardId + '/kanban'" class="nav-item">Kanban</RouterLink>
      </nav>
      <section class="flex">
        <!-- <div class="left-gap"></div> -->
        <RouterView />
      </section>
    </section>
  </main>
</template>


