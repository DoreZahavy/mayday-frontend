<template>
  <div class="home-page home-layout">
    <HomeHeader />
    <div class="welcome">
      <h1>A platform built for a new way of working</h1>
      <div>
        <a class="get-started" @click="goToBoard">Get Started<span class="start-arrow" v-html="getSvg('start')"></span></a>
        <h3>No credit card needed   ✦   Unlimited time on Free plan</h3>
      </div>
      <img src="@/assets/img/homepage/static-carousel.avif">
    </div>
  </div>
</template>

<script>
import { svgService } from '../services/svg.service'
import HomeHeader from '@/cmps/HomeHeader.vue'
export default {
  components: {
    HomeHeader
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }
  },
  created() {
    document.title = "Mayday"
  }
}
</script>
