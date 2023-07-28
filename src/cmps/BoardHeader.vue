<script>
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'

export default {
    props:['miniBoard'],
    data(){
        return {
            boardTitle:this.miniBoard.title
        }
    },
    components:{
        InPlaceEdit
    },
    watch: {
        miniBoard: {
            handler() {
                // console.log('this.miniBoard:', this.miniBoard)
                this.boardTitle = this.miniBoard.title
            },
            // immediate: true,
        },
        boardTitle: {
            handler() {
                // console.log('this.miniBoard:', this.miniBoard)
                this.$emit('update',{prop:'title',toUpdate:this.boardTitle})
            },
            // immediate: true,
        },
    },

}
</script>
<template>
    <header v-if="miniBoard" class="board-header">
        <InPlaceEdit class="board-title" v-model="boardTitle" />
        <!-- <h1 class="board-title">{{ miniBoard.title }}</h1> -->
        <h4>{{ miniBoard.desc }}</h4>
        <!-- <h4 class="board-title">{{ this.boardTitle }}hhhhhh</h4> -->
    </header>

</template>