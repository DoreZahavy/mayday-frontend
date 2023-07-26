<script>
export default {
    data(){
        return{
            boards:[]
        }
    },
    created(){
        this.boards.push(this.$store.getters.board)
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
        <ul>
            <li v-for="board in boards">
                {{ board._id }}
            </li>
        </ul>
    </aside>
</template>