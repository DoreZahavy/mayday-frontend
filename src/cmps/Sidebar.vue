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
        <div class="sidebar-board-utils flex space-between">
            <SidebarFilter @filter="setFilter" />
            <div @click="onAddBoard" class="add-board-btn" v-html="getSvg('addBoard')"></div>
        </div>

        <ul class="clean-list sidebar-list">
            <li v-for="board in boardList" 
                :class="(board._id === boardId) ? 'selected flex align-center' : 'flex align-center'">
                <div v-html="getSvg('boardType')" class="flex align center"></div>
                <RouterLink class="board-link" :to="'/board/' + board._id">{{ board.title }}</RouterLink>
                <div @click="onRemoveBoard(board._id)" v-html="getSvg('trash')" class="flex align center"></div>
            </li>
        </ul>
    </aside>
</template>

<script>
import { ref } from 'vue'
import { svgService } from '../services/svg.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import SidebarFilter from '@/cmps/SidebarFilter.vue'
export default {
    data() {
        return {
            filterBy: ''
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
            try {

                await this.$store.dispatch({ type: 'removeBoard', boardId })
                showSuccessMsg('Board deleted')

            } catch (err) {
                showErrorMsg('Failed deleting board')

            }

        },
        async onAddBoard() {
            try {
                const board = await this.$store.dispatch({ type: 'addBoard' })
                console.log('board._id:', board._id)
                this.$router.push('/board/' + board._id)
                showSuccessMsg('board Added')
            } catch (err) {
                console.log(err);
                showErrorMsg('Failed adding new board')
            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        boardList() {
            let boardsToDisplay = this.$store.getters.boardList
            const regex = new RegExp(this.filterBy, 'i')
            return boardsToDisplay.filter(board => regex.test(board.title))
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
    components: {
        SidebarFilter
    }
}
</script>
