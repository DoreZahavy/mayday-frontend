<script>
import AppHeader from '@/cmps/AppHeader.vue'
import UserMsg from '@/cmps/UserMsg.vue'
import { boardService } from "@/services/board.service.local.js";



export default {

  created() {
    
    this.$store.dispatch({type:'loadBoard'})
  },
  components: {
    AppHeader,
    UserMsg,

  },
}
</script>

<template>
  <main>
    <!-- header for dev -->
    <AppHeader />
    <RouterView />

    <UserMsg />
  </main>
</template>


