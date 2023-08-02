<script>
import AppHeader from '@/cmps/AppHeader.vue'
import UserMsg from '@/cmps/UserMsg.vue'
import { userService } from '@/services/user.service'



export default {

  created() {
    this.loadBoards()
  },
  components: {
    AppHeader,
    UserMsg,

  },
  methods: {
    async loadBoards() {
      const user = userService.getLoggedinUser()
      if (user) this.$store.commit({ type: 'setLoggedinUser', user })
      await this.$store.dispatch({ type: 'loadBoards' })
      const boardId = this.$route.params.boardId
      if (boardId) this.$store.commit({ type: "setBoardById", boardId })
    }
  }
}
</script>

<template>
  <main>
    <!-- //class="main-layout" -->
    <!-- header for dev -->
    <!-- <AppHeader /> -->
    <RouterView />

    <UserMsg />
  </main>
</template>


