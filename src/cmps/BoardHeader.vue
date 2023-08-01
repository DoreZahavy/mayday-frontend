<script>
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import { svgService } from '../services/svg.service'

export default {
    emits:['update', 'toggleModal'],
    props:['miniBoard'],
    data(){
        return {
            boardTitle:this.miniBoard.title
        }
    },
    methods:{
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        updateBoard(title){
            this.$emit('update',{prop:'title',toUpdate:title})

        }
    },
    components:{
        InPlaceEdit
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
        <div class="flex align-center">
            <!-- v-model="boardTitle" -->
            <InPlaceEdit class="board-title " :modelValue="boardTitle" @update:modelValue="updateBoard" />
            <span class="info-icon" @click="this.$emit('toggleModal')" v-html="getSvg('infoBig')"></span>
        </div>
        <p class="board-desc" >{{ miniBoard.desc }} <span @click="this.$emit('toggleModal')">See More</span></p> 
    </header>

</template>