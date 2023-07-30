

<script>
import { svgService } from '../services/svg.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import SidebarFilter from '@/cmps/SidebarFilter.vue'
export default {
    data() {
        return {
            filterBy: '',
            active: this.boardId,
            isCollapsed: false
        }
    },
    created() {

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
        },

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
                console.log('params watcher');
                this.active = this.boardId
                if (!this.boardId) {
                    this.$router.push('/board/' + this.boardList[0]._id) // this.loadBoard(this.boardList[0]._id)
                    document.title = this.boardList[0].title
                }
                else {
                    this.loadBoard(this.boardId)
                    document.title = this.$store.getters.boardTitle
                }
            },
            immediate: true,
        },
    },
    components: {
        SidebarFilter
    }
}
</script>
<template>
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">

        <div class="divider-div">
            <ul class="clean-list nav-list">
                <li>
                    <div class="flex align-center">
                        <span v-html="getSvg('home')" class="sidebar-list-svg"></span>
                        <RouterLink to="/">Home</RouterLink>
                    </div>
                </li>
            </ul>
        </div>
        <div class="board-control">

            <SidebarFilter @filter="setFilter" />
            <div @click="onAddBoard" class="add-board-btn" v-html="getSvg('addBoard')"></div>
        </div>

        <ul class="clean-list sidebar-list">
            <li class="flex" v-for="board in boardList" :class="{ active: active === board._id }">
                <div class="flex align-center">
                    <div v-html="getSvg('boardType')"></div>
                    <RouterLink class="board-link" :to="'/board/' + board._id">{{ board.title }}</RouterLink>
                </div>
                <!-- <p class="board-link" @click="loadBoard(board._id)">{{ board.title }}</p> -->
                <div class="trash-board" @click="onRemoveBoard(board._id)" v-html="getSvg('trash')"></div>
            </li>
        </ul>
        <div class="collapse-arrow" v-html="getSvg('arrowLeft')" @click="isCollapsed = !isCollapsed"></div>
        <!-- <div v-else class="collapse-arrow" v-html="getSvg('arrowRight')" @click="isCollapsed = !isCollapsed"></div> v-if="!isCollapsed" -->
    </aside>
</template>