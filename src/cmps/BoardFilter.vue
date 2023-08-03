<template>
    <div v-if="currBoard" class="board-filter-container">
        <span class="blue-button new-task-button" @click="onAddTask">New Item</span>
        <transition>
            <span v-if="!editing" class="span-common span-search" @click="enableEditing">
                <span v-html="getSvg('search')" class="span-common"></span>Search
            </span>
            <span v-else style="position: relative; margin-top: -0.1em; margin-right: 1em"><input class="search-input"
                    @change="filterByText" v-model="searchText" ref="searchInput" placeholder="Search"
                    @blur="editing = false"
                    style="height: 2.25em; width: 20em; border: 0.5px solid royalblue; background-color: transparent; border-radius: 4px; padding-left: 2.27em; font-size: 1em; padding-bottom: 1px;"><span
                    v-html="getSvg('search')" class="span-common"
                    style="position: absolute; left: 0.6em; top: 4.2px; z-index: -9"></span></span>
        </transition>
        <el-popover style="width: 800px !important" ref="personPopover" placement="bottom" trigger="click"
            :show-arrow="false" popper-class="person-popover-container">
            <div class="person-filter">
                <p>Quick person filter</p>
                <p>Filter items and subitems by person</p>
                <div><img v-for="member in members" :src="member.imgUrl" :class="{ active: member._id === activeMemberId }"
                        @click="filterByPerson(member._id)"></div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: 0px; gap: 4px;" @click="openPopover('person')">
                    <span v-html="getSvg('personFilter')" class="span-person"></span>Person
                </span>
            </template>
        </el-popover>
        <el-popover ref="filterPopover" placement="bottom" trigger="click" :show-arrow="false"
            popper-class="multi-filter-popover-container">
            <p>Quick filters</p>
            <div class="multi-filter">
                <div class="filter-column">
                    <p>Members</p>
                    <div class="member-filter">
                        <img v-for="member in members" :src="member.imgUrl"
                            :class="{ active: multiFilter.members.includes(member._id) }"
                            @click="toggleFilter('members', member._id)">
                    </div>
                </div>
                <div class="filter-column">
                    <p>Groups</p>
                    <div>
                        <div v-for="group in currBoard.groups" :class="{ active: multiFilter.groups.includes(group._id) }"
                            @click="toggleFilter('groups', group._id)">{{ group.title }}</div>
                    </div>
                </div>
                <div class="filter-column">
                    <p>Tasks</p>
                    <div>
                        <div v-for="task in allTasks" :class="{ active: multiFilter.tasks.includes(task._id) }"
                            @click="toggleFilter('tasks', task)">{{ task.title }}</div>
                    </div>
                </div>
                <div class="filter-column">
                    <p>Status</p>
                    <div>
                        <div v-for="status in allStatus"
                            :class="{ active: JSON.stringify(multiFilter.status).includes(JSON.stringify(status.title)) }"
                            @click="toggleFilter('status', status)">{{ status.title }}</div>
                    </div>
                </div>
                <div class="filter-column">
                    <p>Priority</p>
                    <div>
                        <div v-for="priority in allPriority"
                            :class="{ active: JSON.stringify(multiFilter.priority).includes(JSON.stringify(priority.title)) }"
                            @click="toggleFilter('priority', priority)">{{ priority.title }}</div>
                    </div>
                </div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: 6.4px;" @click="openPopover('filter')">
                    <span v-html="getSvg('filter')" class="span-filter"></span>Filter
                </span>
            </template>
        </el-popover>
        <el-popover ref="sortPopover" placement="bottom" trigger="click" :show-arrow="false">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 0; gap: 0.3em;" @click="openPopover('sort')">
                    <span v-html="getSvg('sortBig')" class="span-sort"></span>Sort
                </span>
            </template>
        </el-popover>
        <el-popover ref="hidePopover" placement="bottom" trigger="click" :show-arrow="false">
            <div class="hide-filter">Hide</div>
            <template #reference>
                <span class="span-common" style="margin-top: 0; gap: 0.4em;" @click="openPopover('hide')">
                    <span v-html="getSvg('hide')" class="span-hide"></span>Hide
                </span>
            </template>
        </el-popover>
    </div>
</template>

<script>
import { svgService } from '../services/svg.service'
export default {
    props: {
        board: Object
    },
    emits: ['addTask', 'filter'],
    data() {
        return {
            editing: false,
            currBoard: null,
            modifiedBoard: {},
            searchText: '',
            activeMemberId: '',
            multiFilter: {
                members: [],
                groups: [],
                tasks: [],
                status: [],
                priority: []
            }
        }
    },
    computed: {
        members() {
            const board = this.modifiedBoard.groups ? this.modifiedBoard : this.currBoard
            return board ? board.members : ''
        },
        allTasks() {
            const board = this.currBoard
            if (!board) return []
            return board && board.groups ? board.groups.flatMap(group => group.tasks) : []
        },
        allStatus() {
            const board = this.modifiedBoard.groups ? this.modifiedBoard : this.currBoard
            if (!board || !board.statusLabelConfig) return []
            const allStatuses = JSON.parse(JSON.stringify(board.statusLabelConfig))
            allStatuses.pop()
            return allStatuses
        },
        allPriority() {
            const board = this.modifiedBoard.groups ? this.modifiedBoard : this.currBoard
            if (!board || !board.priorityLabelConfig) return []
            const allPriorities = JSON.parse(JSON.stringify(board.priorityLabelConfig))
            allPriorities.pop()
            return allPriorities
        },
    },
    methods: {
        onAddTask() {
            this.$emit('addTask')
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        openPopover(popoverName) {
            // this.$refs[`${popoverName}Popover`].show()
        },
        enableEditing() {
            this.editing = true
            this.$nextTick(() => {
                this.$refs.searchInput.focus()
            })
        },
        filterByPerson(memberId) {
            if (this.activeMemberId === memberId) {
                this.activeMemberId = ''
                this.$store.commit('setFilteredBoard', { filteredBoard: this.currBoard })
                return
            } else { this.activeMemberId = memberId }

            const modifiedBoard = JSON.parse(JSON.stringify(this.currBoard))

            modifiedBoard.groups.forEach(group => {
                group.tasks = group.tasks.filter(task =>
                    task.Members && task.Members.some(member => member._id === memberId)
                )
            })

            console.log(modifiedBoard)
            this.$store.commit('setFilteredBoard', { filteredBoard: modifiedBoard })
        },
        filterByText() {
            const modifiedBoard = JSON.parse(JSON.stringify(this.currBoard))

            modifiedBoard.groups = modifiedBoard.groups.filter(group => {
                if (this.containsSearchText(group.title, this.searchText)) return true

                group.tasks = group.tasks.filter(task => {
                    if (this.containsSearchText(task.title, this.searchText) ||
                        this.containsSearchText(task.Number, this.searchText) ||
                        this.containsSearchText(task.Text, this.searchText) ||
                        this.containsSearchText(task.Status.title, this.searchText) ||
                        this.containsSearchText(task.Priority.title, this.searchText) ||
                        this.containsSearchText(this.formatDate(task.Date), this.searchText) ||
                        this.containsSearchText(this.formatDate(task.Timeline.startDate), this.searchText) ||
                        this.containsSearchText(this.formatDate(task.Timeline.dueDate), this.searchText)) return true

                    if (task.Members.some(member => this.containsSearchText(member.fullname, this.searchText))) return true

                    return false
                })

                return group.tasks.length > 0
            })

            console.log(modifiedBoard)
            this.$store.commit('setFilteredBoard', { filteredBoard: modifiedBoard })
        },
        containsSearchText(value, searchText) {
            if (value && (typeof value === 'string' || typeof value === 'number')) {
                return value.toString().toLowerCase().includes(searchText.toLowerCase())
            }
            return false
        },
        toggleFilter(filterCategory, item) {
            const value = (filterCategory === 'status' || filterCategory === 'priority') ? item.title :
                (filterCategory === 'tasks') ? item._id : item
            const index = this.multiFilter[filterCategory].indexOf(value)
            if (index === -1) {
                this.multiFilter[filterCategory].push(value)
            } else {
                this.multiFilter[filterCategory].splice(index, 1)
            }
            console.log(this.multiFilter)
        },
        applyMultiFilter() {
            let boardToFilter = this.currBoard
            this.modifiedBoard = JSON.parse(JSON.stringify(boardToFilter))

            if (this.multiFilter.members.length > 0) {
                this.modifiedBoard.groups.forEach(group => {
                    group.tasks = group.tasks.filter(task =>
                        task.Members && task.Members.some(member => this.multiFilter.members.includes(member._id))
                    )
                })
            }

            if (this.multiFilter.groups.length > 0) {
                this.modifiedBoard.groups = this.modifiedBoard.groups.filter(group =>
                    this.multiFilter.groups.includes(group._id)
                )
            }

            if (this.multiFilter.tasks.length > 0) {
                this.modifiedBoard.groups.forEach(group => {
                    group.tasks = group.tasks.filter(task => this.multiFilter.tasks.includes(task._id))
                })
            }

            if (this.multiFilter.status.length > 0) {
                this.modifiedBoard.groups.forEach(group => {
                    group.tasks = group.tasks.filter(task =>
                        this.multiFilter.status.includes(task.Status.title)
                    )
                })
            }

            if (this.multiFilter.priority.length > 0) {
                this.modifiedBoard.groups.forEach(group => {
                    group.tasks = group.tasks.filter(task =>
                        this.multiFilter.priority.includes(task.Priority.title)
                    )
                })
            }

            console.log(this.modifiedBoard)
            this.$store.commit('setFilteredBoard', { filteredBoard: this.modifiedBoard })
        },
        formatDate(timestamp) {
            const date = new Date(timestamp)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        }
    },
    watch: {
        board: {
            immediate: true,
            handler(newValue) {
                this.currBoard = { ...newValue }
            }
        },
        multiFilter: {
            handler() {
                this.applyMultiFilter()
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
.search-input:focus {
    outline: none !important;
    font-family: figtree;
}
</style>