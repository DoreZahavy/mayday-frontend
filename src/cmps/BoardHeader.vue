<script>
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import InviteModal from '../cmps/InviteModal.vue'

export default {
    emits:['update', 'toggleModal'],
    props:['miniBoard'],
    data(){
        return {
            boardTitle:this.miniBoard.title
        }
    },
    methods:{
       
        updateBoard(title){
            this.$emit('update',{prop:'title',toUpdate:title})

        },
        openInviteModal(){
            this.$emit('open')
        }
    },
    components:{
        InPlaceEdit,
        InviteModal
    },
    watch: {
        miniBoard: {
            handler() {
                this.boardTitle = this.miniBoard.title
            },
            // immediate: true,
        },
        boardTitle: {
            handler() {
                // this.$emit('update',{prop:'title',toUpdate:this.boardTitle})
            },
            // immediate: true,
        },
    },

}
</script>
<template>
    <header v-if="miniBoard" class="board-header">
        <div class="flex align-center space-between">
            <!-- v-model="boardTitle" -->
            <div class="flex align-center">

                <InPlaceEdit class="board-title " :modelValue="boardTitle" @update:modelValue="updateBoard" />
                <span class="info-icon" @click="this.$emit('toggleModal')" v-icon="'infoBig'"></span>
            </div>
            <div class="btns">
                <button @click="openInviteModal" class="invite-btn">invite</button>

            </div>
        </div>
        <p class="board-desc" >{{ miniBoard.desc }} <span @click="this.$emit('toggleModal')">See More</span></p> 
    </header>

</template>