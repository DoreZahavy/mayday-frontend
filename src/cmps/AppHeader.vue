<template>
  <header class="app-header">
    <nav class="main-nav">

      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/board">BOARD</RouterLink>
    </nav>
    
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>