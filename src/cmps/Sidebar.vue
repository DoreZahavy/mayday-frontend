<script>
import { svgService } from '../services/svg.service'
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
        onRemoveBoard(boardId) {
            this.$store.dispatch({ type: 'removeBoard', boardId })

        },
        onAddBoard() {
            this.$store.dispatch({ type: 'addBoard' })

        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    computed: {
        boardList() {
            return this.$store.getters.boardList
        },

    }
}
</script>
<template>
    <aside class="sidebar">

        <div>
            <ul class="clean-list">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
            </ul>
        </div>
        <hr>
        <div @click="onAddBoard" class="add-board-btn" v-html="getSvg('addBoard')"></div>

        <!-- <button  @click="onAddBoard">ADD NEW BOARD</button> -->
        <ul class="clean-list">
            <li class="flex" v-for="board in boardList">
                <div v-html="getSvg('boardType')"></div>
                <p class="board-link" @click="loadBoard(board._id)">{{ board.title }}</p>
                <div @click="onRemoveBoard(board._id)"  v-html="getSvg('trash')"></div>
            </li>
        </ul>
    </aside>
</template>