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
import BoardFilter from '../cmps/BoardFilter.vue'
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
    board() {
      return this.$store.getters.board
    },
    boardId() {
      return this.$route.params.boardId
    },
    attachmentModal() {
      return this.$store.getters.attachmentModal
    },
    membersLength() {
      // const members = this.$store.getters.boardMembers
      // return members.length
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
    InviteModal,
    BoardFilter
  },
  created() {
     socketService.emit(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
     // socketService.off(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
     // socketService.on(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
    this.unsub = eventBusService.on('task-clicked', (taskId) => {
      this.openConversations(taskId)
    })
  },
  unmounted() {
    // socketService.off(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
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
      console.log('prop:', prop)
      console.log('toUpdate:', toUpdate)
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
      this.conversationsTaskId = undefined
    },
    addMember(user) {
      // console.log('userId:', userId)
      this.$store.dispatch({ type: 'addMember', user })
    },
    removeMember(userId) {
      this.$store.dispatch({ type: 'removeMember', userId })
    },
    async addTask() {
      try {
        const groupId = JSON.parse(JSON.stringify({ ...this.board }.groups[0]._id))
        await this.$store.dispatch({ type: 'addTask', groupId, title: 'New Task' })
        showSuccessMsg('Task added')
      } catch (err) {
        showErrorMsg('Failed to add task')
      }
    },
  },
  watch: {
    boardId() {
      // socketService.off(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.$route.params.boardId)

    },
  }
}
</script>
<template>
  <main class="main-layout">
    <MainHeader />
    <Sidebar />
    <div>
      <!-- <button @click="inviteModal = true" class="invite-btn">invite</button> -->
      <InviteModal v-if="inviteModal" @add="addMember" @remove="removeMember" @close="inviteModal = false" />
      <transition name="slide">
        <div class="drawer-modal" v-if="showDrawerModal">
          <div class="close-button" @click="closeDrawerModal" v-icon="'xButton'"></div>
          <h4 class="drawer-title"
            style="font-weight: 900; font-family: figtree; margin-left: 4px; margin-top: 9px;font-size: 1.5em;">
            Mayday
            Teams</h4>
          <nav class="drawer-nav">
            <button class="drawer-nav-link" @click="openActivities">Activity</button>
            <button v-if="conversationsTaskId" class="drawer-nav-link" @click="openConversations">Updates</button>
          </nav>
          <!-- <h2>Social Media Campaign - #NewRelease</h2> -->
          <Conversations v-if="showConversationsContent" :taskId="conversationsTaskId">
          </Conversations>
          <Activities v-else-if="showActivitiesContent" :boardId="boardId" :taskId="conversationsTaskId">
          </Activities>
        </div>
      </transition>
    </div>
    <section class="board-container">
      <BoardInfoModal @closeModal="toggleModal" @update="updateBoard" v-if="this.showModal" :miniBoard="miniBoard" />
      <BoardHeader :members="membersLength" @openact="openActivities" @open="inviteModal = true" :miniBoard="miniBoard"
        @update="updateBoard" @toggleModal="toggleModal" />
      <nav class="board-nav">
        <RouterLink :class="{ active: active === 'table' }" @click="active = 'table'" :to="'/board/' + boardId"
          class="nav-item">
          <!-- <span>&#61996</span> -->
          <span v-html="getSvg('homeSml')"></span>Main Table
        </RouterLink>
        <RouterLink :class="{ active: active === 'kanban' }" @click="active = 'kanban'"
          :to="'/board/' + boardId + '/kanban'" class="nav-item">Kanban</RouterLink>
      </nav>
      <BoardFilter style="
    position: sticky;
    left: 2.72rem;
    top: 0px;" :board="board" @addTask="addTask" @filter="console.log('filter')" />
      <section class="flex">
        <!-- <div class="left-gap"></div> -->
        <RouterView />
      </section>
    </section>
    <AttachmentModal :file="attachmentModal" v-if="attachmentModal" />
    <!-- <CheckboxModal :checkedTasks=""/> -->
  </main>
</template>









