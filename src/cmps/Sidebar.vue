<script>
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
        onRemoveBoard(boardId){
            this.$store.dispatch({ type: 'removeBoard', boardId })

        },
        onAddBoard(){
            this.$store.dispatch({ type: 'addBoard' })

        }
    },
    computed: {
        boardList() {
            return this.$store.getters.boardList
        }
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
        <button @click="onAddBoard">ADD NEW BOARD</button>
        <ul class="clean-list">
            <li v-for="board in boardList">
                <h2 @click="loadBoard(board._id)">{{ board.title }}</h2>
                <button @click="onRemoveBoard(board._id)">REMOVE BOARD</button>
            </li>
        </ul>
    </aside>
</template>