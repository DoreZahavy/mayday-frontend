<script>
import { svgService } from '../services/svg.service'

export default{
methods:{
    getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        goToBoard(){
            const boardId = this.boardList[0]._id
            this.$store.commit('setBoardById', boardId)
            console.log('boardId:', boardId)
            this.$router.push('/board/' + boardId)
            // this.$router.push('/board')
        }
},
computed:{
    boardList(){

        return this.$store.getters.boardList
        // return list[0]._id
    }
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
                <a class="get-started" @click="goToBoard" >get started<span class="start-arrow" v-html="getSvg('start')"></span></a> 
                <!-- <RouterLink class="get-started" :to="'/board'" >get started<span class="start-arrow" v-html="getSvg('start')"></span></RouterLink>  -->
            </div>
        </section>
    </header>
</template>
<!-- :to="'/board'" -->