<script>
import { svgService } from '../services/svg.service'
import {showSuccessMsg, showErrorMsg} from '../services/event-bus.service.js'
export default {
    data() {
        return {
            // boards: [this.$store.getters.board]
        }
    },
    created() {
        // this.boards[0] = this.$store.getters.board
        // console.log("🚀 ~ file: Sidebar.vue:10 ~ created ~ this.boards:", this.boards)
    },
    methods: {
        loadBoard(boardId) {
            this.$store.commit({ type: 'setBoardById', boardId })
        },
        async onRemoveBoard(boardId) {
            try{

                await this.$store.dispatch({ type: 'removeBoard', boardId })
                showSuccessMsg('Board deleted')

            }catch(err){
                showErrorMsg('Failed deleting board')

            }

        },
        async onAddBoard() {
            try{
                const board = await this.$store.dispatch({ type: 'addBoard' })
                console.log('board._id:', board._id)
                this.$router.push('/board/' + board._id)
                showSuccessMsg('board Added')
            } catch(err){
                console.log(err);
                showErrorMsg('Failed adding new board')
            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    computed: {
        boardList() {
            return this.$store.getters.boardList
        },
        boardId() {
            return this.$route.params.boardId
        },
    },
    watch: {
        boardId: {
            handler() {
                if (!this.boardId) this.$router.push('/board/' + this.boardList[0]._id) // this.loadBoard(this.boardList[0]._id)
                else this.loadBoard(this.boardId)
            },
            immediate: true,
        },
    },
}
</script>
<template>
    <aside class="sidebar">

        <div class="divider-div">
            <ul class="clean-list sidebar-list nav-list">
                <li>
                    <div>
                        <span v-html="getSvg('home')"></span>
                        <RouterLink to="/">Home</RouterLink>
                    </div>
                </li>
            </ul>
        </div>
        <div @click="onAddBoard" class="add-board-btn" v-html="getSvg('addBoard')"></div>

        <!-- <button  @click="onAddBoard">ADD NEW BOARD</button> -->
        <ul class="clean-list sidebar-list">
            <li class="flex" v-for="board in boardList">
                <div v-html="getSvg('boardType')"></div>
                <RouterLink class="board-link" :to="'/board/' + board._id">{{ board.title }}</RouterLink>
                <!-- <p class="board-link" @click="loadBoard(board._id)">{{ board.title }}</p> -->
                <div @click="onRemoveBoard(board._id)" v-html="getSvg('trash')"></div>
            </li>
        </ul>
    </aside>
</template>