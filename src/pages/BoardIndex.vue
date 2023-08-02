<script>
import Sidebar from '@/cmps/Sidebar.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import BoardHeader from '@/cmps/BoardHeader.vue'
import MainHeader from '@/cmps/MainHeader.vue'
import BoardInfoModal from '../cmps/BoardInfoModal.vue'
import Activities from '../cmps/Activities.vue'
import Conversations from '../cmps/Conversations.vue'
import AttachmentModal from '../cmps/AttachmentModal.vue'
import InviteModal from '../cmps/InviteModal.vue'

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
      conversationsTaskId: undefined,
      inviteModal: false
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
    AttachmentModal,
    InviteModal
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
    },
    addMember(userId){
      console.log('userId:', userId)
      this.$store.commit({type:'addMember',userId})
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
      
      <!-- <button @click="inviteModal = true" class="invite-btn">invite</button> -->
      <InviteModal v-if="inviteModal" @add="addMember" @close="inviteModal = false" />
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
      <BoardHeader @openact="openActivities" @open="inviteModal = true" :miniBoard="miniBoard" @update="updateBoard" @toggleModal="toggleModal" />
      <nav class="board-nav">

        <RouterLink :class="{ active: active === 'table' }" @click="active = 'table'" :to="'/board/' + boardId"
          class="nav-item">
          <!-- <span>&#61996</span> -->
          <span v-html="getSvg('homeSml')"></span>Main Table
        </RouterLink>

        <RouterLink :class="{ active: active === 'kanban' }" @click="active = 'kanban'"
          :to="'/board/' + boardId + '/kanban'" class="nav-item">Kanban</RouterLink>
      </nav>
      <div class="board-filter-container">
        <span class="blue-button new-task-button">New Item</span>
        <span class="span-common span-search">
          <span v-html="getSvg('search')" class="span-common"></span>Search
        </span>
        <span class="span-common" style="margin-top: 0px; gap: 0.4em;">
          <span v-html="getSvg('personFilter')" class="span-person"></span>Person
        </span>
        <span class="span-common" style="margin-top: 6.4px;">
          <span v-html="getSvg('filter')" class="span-filter"></span>Filter
        </span>
        <span class="span-common" style="margin-top: 0; gap: 0.3em;">
          <span v-html="getSvg('sortBig')" class="span-sort"></span>Sort
        </span>
        <span class="span-common" style="margin-top: 0; gap: 0.4em;">
          <span v-html="getSvg('hide')" class="span-hide"></span>Hide
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


