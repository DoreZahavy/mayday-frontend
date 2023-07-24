<script>
import AppHeader from '@/cmps/AppHeader.vue'
import UserMsg from '@/cmps/UserMsg.vue'


export default {

  created() {

  },
  components: {
    AppHeader,
    UserMsg,

  },
}
</script>

<template>
  <main>
    <AppHeader />
    <RouterView />

    <UserMsg />
  </main>
</template>


