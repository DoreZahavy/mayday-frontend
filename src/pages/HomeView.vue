<template>
  <div class="home-page home-layout">
    <HomeHeader/>
    <div  class="welcome">

      <h1>All aspects of work in one complete solution</h1>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/cmps/HomeHeader.vue'
export default{
  components: {
    HomeHeader
  },
  created(){
    document.title="Mayday"
  }
}
</script>
