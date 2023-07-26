<script>
export default {
    data() {
        return {
            boards: [this.$store.getters.board]
        }
    },
    created() {
        this.boards[0] = this.$store.getters.board
        console.log("🚀 ~ file: Sidebar.vue:10 ~ created ~ this.boards:", this.boards)
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
        <ul class="clean-list">
            <li v-for="board in boards">
                <RouterLink :to="'/board/' + board._id">{{ board.title }}</RouterLink>
            </li>
        </ul>
    </aside>
</template>