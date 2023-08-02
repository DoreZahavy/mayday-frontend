<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import BoardHeader from '@/cmps/BoardHeader.vue'
import MainHeader from '@/cmps/MainHeader.vue'
import BoardInfoModal from '../cmps/BoardInfoModal.vue'
import Activities from '../cmps/Activities.vue'
import Conversations from '../cmps/Conversations.vue'
import AttachmentModal from '../cmps/AttachmentModal.vue'

import { svgService } from '../services/svg.service'
import { showSuccessMsg, showErrorMsg, eventBusService } from '../services/event-bus.service.js'
import { SOCKET_EMIT_SET_TOPIC, socketService } from '../services/socket.service'

export default {

  data() {
    return {
      title: '',
      active: 'table',
      showModal: false,
      showDrawerModal: false,
      showActivitiesContent: false,
      showConversationsContent: false,
      conversationsTaskId: undefined
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
    attachmentModal() {
      return this.$store.getters.attachmentModal
    }
  },
  components: {
    Sidebar,
    InPlaceEdit,
    BoardHeader,
    MainHeader,
    BoardInfoModal,
    Activities,
    Conversations,
    AttachmentModal
  },
  created() {
    socketService.off(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
    socketService.on(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)

    this.unsub = eventBusService.on('task-clicked', (taskId) => {
      this.openConversations(taskId)
    })
  },
  unmounted() {
    socketService.off(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)

  },
  mounted() {
    document.title = 'Mayday'
    setTimeout(() => {
      document.title = this.$store.getters.boardTitle//TODO: make this less janky, event driven
    }, 600)
  },
  beforeUnmount() {
    this.unsub()
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
    openActivities() {
      this.showDrawerModal = true
      this.showConversationsContent = false
      this.showActivitiesContent = true
    },
    openConversations(taskId) {
      this.conversationsTaskId = taskId
      this.showDrawerModal = true
      this.showActivitiesContent = false
      this.showConversationsContent = true
    },
    closeDrawerModal() {
      this.showDrawerModal = false
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
        style="position: fixed; font-family:'figtree'; cursor: pointer; z-index: 43; top: 78.5px; right: 7%; border: none; background-color: transparent; padding: 5px; font-weight: 100; font-size: 1.05em"
        @click="openActivities">Activity
        <span v-html="getSvg('person')" style="position:absolute; top: 2px; right: -28px;"></span>
      </button>
      <transition name="slide">
        <div class="drawer-modal" v-if="showDrawerModal">
          <div class="close-button" @click="closeDrawerModal" v-icon="'xButton'"></div>
          <h4 class="drawer-title"
            style="font-weight: 900; font-family: figtree; margin-left: 4px; margin-top: 9px;font-size: 1.5em;">
            Mayday
            Teams</h4>
          <nav class="drawer-nav">
            <button class="drawer-nav-link">Activity</button>
            <button class="drawer-nav-link">Updates</button>
          </nav>
          <!-- <h2>Social Media Campaign - #NewRelease</h2> -->
          <Conversations v-if="showConversationsContent" :taskId="conversationsTaskId">
          </Conversations>
          <Activities v-else-if="showActivitiesContent" :boardId="boardId"></Activities>
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
      <div
        style="display: flex; justify-content: space-between; align-items: center; width: 550px; height: 65px; background-color: rgba(157, 204, 251, 0); border-radius: 4px;margin-left: 2.72rem;">
        <span
          style="width:80px; display: flex; justify-content: center; align-items: center; font-size: 1em; width: 83px; margin-right: 1.3em; border-radius: 5px; cursor: pointer;"
          class="blue-button">New Item
        </span>
        <span style="color: #323338; width:80px; display: flex; gap: 2px; width: 83px; cursor: pointer;">
          <span v-html="getSvg('search')"
            style="color: #323338; width:20px; height: 20px; display: flex; margin-top: -2px;"></span>Search
        </span>
        <span style="color: #323338; width:80px; display: flex; gap: 3px; width: 83px; cursor: pointer;">
          <span v-html="getSvg('personFilter')"
            style="color: #323338;  width:18px; height: 18px; display: flex; gap: 2px; margin-top: 0.7px;"></span>Person
        </span>
        <span
          style="color: #323338; width:80px; display: flex; gap: 3px; width: 83px; margin-top: 4.5px; cursor: pointer;">
          <span v-html="getSvg('filter')"
            style="color: #323338;width:23px; height: 23px; display: flex; gap: 2px; margin-top: 0px;"></span>Filter</span>
        <span
          style="color: #323338; width:80px; display: flex; gap: 3px; width: 83px; margin-top: -2px; cursor: pointer;">
          <span v-html="getSvg('sortBig')"
            style="color: #323338; width:18px; height: 18px; display: flex; gap: 2px; margin-top: -1.3px;"></span>Sort
        </span>
        <span style="color: #323338; width:80px; display: flex; gap: 3px; width: 83px; cursor: pointer;">
          <span v-html="getSvg('hide')"
            style="color: #323338; width:18px; height: 18px; display: flex; margin-top: -1.9px"></span>Hide
        </span>
      </div>
      <section class="flex">
        <!-- <div class="left-gap"></div> -->
        <RouterView />
      </section>
    </section>
    <AttachmentModal :file="attachmentModal" v-if="attachmentModal" />
  </main>
</template>


