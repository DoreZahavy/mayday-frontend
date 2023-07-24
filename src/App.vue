<script>
import AppHeader from '@/cmps/AppHeader.vue'
import Sidebar from '@/cmps/Sidebar.vue'
import UserMsg from '@/cmps/UserMsg.vue'


export default {

  created() {

  },
  components: {
    AppHeader,
    UserMsg,
    Sidebar
  },
}
</script>

<template>
  <header>

    <div class="wrapper">
      <AppHeader />
      <Sidebar />
      <RouterView />
      <UserMsg />
    </div>
  </header>

</template>

<style scoped></style>
