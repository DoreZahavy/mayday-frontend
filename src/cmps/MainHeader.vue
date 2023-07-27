<template>
    <header class="main-header flex align-center">
        <!-- <img style="width:33px; height:33px" :src="getSvg('flower')" /> -->
        <i  v-html="getSvg('flower')"></i>
        <RouterLink class="board-logo" to="/">

            <span>mayday</span>
            <span>work management</span>
        </RouterLink>
    </header>
  </template>
  <script>
  import { svgService } from '../services/svg.service'

  export default {
    computed: {
      loggedInUser() {
        return this.$store.getters.loggedinUser
      },
    },
    methods:{
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
  }
  </script>