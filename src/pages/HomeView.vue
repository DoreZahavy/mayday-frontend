<template>
  <div class="home-page home-layout">
    <HomeHeader />
      <section class="welcome full">
        <h1>A platform built for a new way of working</h1>
        <div>
          <a class="get-started" @click="goToBoard">Get Started<span class="start-arrow"
              v-html="getSvg('start')"></span></a>
          <h3>No credit card needed ✦ Unlimited time on Free plan</h3>
        </div>
        <img src="@/assets/img/homepage/static-carousel.avif">
      </section>
      <section class="customers">
        <h2>Trusted by 180,000+ customers worldwide</h2>
        <article>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/HoltCat.avif"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/canva.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/coca_cola.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/oxy.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/lionsgate.avif"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/carrefour.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/bd.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/glossier.png"></div>
          <div class="customer-image-container"><img src="@/assets/img/homepage/customers/universal.png"></div>
        </article>
      </section>
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
