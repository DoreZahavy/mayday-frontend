

<script>
import { svgService } from '../services/svg.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import SidebarFilter from '@/cmps/SidebarFilter.vue'
export default {
    data() {
        return {
            filterBy: '',
            active: this.boardId,
            isCollapsed: false,
            showModal: true

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
            <div>
                <button @click="showModal = true">Open Modal</button>

                <transition name="slide">
                    <div class="modal" v-if="showModal">
                        <div class="modal-header">
                            <span class="close-button" @click="showModal = false" v-html="getSvg('xButton')"></span>
                            <h2>Social Media Campaign - #NewRelease</h2>
                        </div>
                    </div>
                </transition>
            </div>
        </ul>
        <div class="collapse-arrow" v-html="getSvg('arrowLeft')" @click="isCollapsed = !isCollapsed"></div>
        <!-- <div v-else class="collapse-arrow" v-html="getSvg('arrowRight')" @click="isCollapsed = !isCollapsed"></div> v-if="!isCollapsed" -->
    </aside>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    z-index: 90;
}

.modal-header {
    background-color: #fff;
    color: #323338;
    width: 100%;
    height: 100%;
    overflow: auto;
    font-weight: 300;
    letter-spacing: 0.8px;
    padding-top: 70px;
    padding-left: 28px;
    box-shadow: -1px 0 10px rgba(0, 0, 0, 0.1);
}

.close-button {
    position: absolute;
    top: 25px;
    left: 28.5px;
    color: #777;
    font-size: 28px;
    cursor: pointer;
    scale: 2;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style>