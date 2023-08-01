<script>
import { svgService } from '../services/svg.service'

export default{
methods:{
    getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
},
computed:{
    // this.$store.getters,
}
}
</script>
<template>
    <header class="home-header full home-layout">
        <section class="flex space-between align-center">

            <div>
                <img src="../assets/img/logo.png" >
                <span class="home-logo">mayday</span>
            </div>
            <div class="flex align-center">
                <RouterLink class="login-link" to="/loginsignup">Log in</RouterLink>
                <RouterLink class="get-started" to="/board">get started<span class="start-arrow" v-html="getSvg('start')"></span></RouterLink>
            </div>
        </section>
    </header>
</template>