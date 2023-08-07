<template>
    <div v-if="currBoard && isOnBoard" class="board-filter-container">
        <span class="blue-button new-task-button" @click="onAddTask">New Task</span>
        <span v-if="!editing" class="span-common span-search" @click="enableEditing">
            <span v-html="getSvg('search')" class="span-common"></span>Search
        </span>
        <span v-else style="position: relative; margin-top: -0.1em; margin-right: 1em"><input class="search-input"
                v-model="searchText" ref="searchInput" placeholder="Search" @blur="editing = false"
                style="height: 2.25em; width: 20em; border: 0.5px solid royalblue; background-color: transparent; border-radius: 4px; padding-left: 2.03em; font-size: 1.15em; margin-bottom: -1px;"><span
                v-html="getSvg('search')" class="span-common"
                style="position: absolute; left: 0.6em; top: 6px; z-index: -9"></span></span>
        <el-popover style="width: 800px !important" ref="personPopover" placement="bottom" trigger="click"
            :show-arrow="false" popper-class="person-popover-container">
            <div class="person-filter">
                <p>Quick person filter</p>
                <p>Filter items and subitems by person</p>
                <div style="flex-wrap:wrap;"><img v-for="member in members" :src="member.imgUrl"
                        :class="{ active: member._id === activeMemberId }" @click="setPersonFilter(member._id)"></div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: -0.5px; gap: 4px;" @click="openPopover('person')">
                    <span style="margin-top: 1px;" v-html="getSvg('personFilter')" class="span-person"></span>Person
                </span>
            </template>
        </el-popover>
        <el-popover ref="filterPopover" placement="bottom" trigger="click" :show-arrow="false"
            popper-class="multi-filter-popover-container">
            <p>Quick filters<span style="font-size: 0.85em; font-weight: 300; margin-left: 1em;">Showing {{ itemsShown }}
                    of {{ itemsTotal }}
                    items</span></p>
            <p style="position: absolute; top: 11.5px; right: 20px; font-size: 1em; font-weight: 400; cursor: pointer;"
                @click="onClearFilter">Clear all</p>
            <div class="multi-filter">
                <div class="filter-column">
                    <p>Members</p>
                    <div class="member-filter">
                        <div v-for="member in members" :class="{ active: multiFilter.members.includes(member._id) }"
                            style="position: relative; text-align: left;" @click="toggleFilter('members', member._id)">
                            <img style="position: absolute; top: 50%; left: 0em; transform: translate( 0%, -87%);"
                                :src="member.imgUrl"><span style="padding-left: 2em;">{{ member.fullname }}</span>
                        </div>
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
                            style="position: relative; text-align: left;" @click="toggleFilter('status', status)">
                            <div :class="status.color" class="status-color"
                                style="display: inline-block; position: absolute; top: 50%; transform: translate(0, -50%); left: 0.85em; width: 0.1em; height: 0.1em; border-radius: 50%;">
                            </div><span style="padding-left: 1.9em;">{{ status.title ? status.title : 'Blank' }}</span>
                        </div>
                    </div>
                </div>
                <div class="filter-column">
                    <p>Priority</p>
                    <div>
                        <div v-for="priority in allPriority"
                            :class="{ active: JSON.stringify(multiFilter.priority).includes(JSON.stringify(priority.title)) }"
                            style="position: relative; text-align: left;" @click="toggleFilter('priority', priority)">
                            <div :class="priority.color" class="status-color"
                                style="display: inline-block; position: absolute; top: 50%; transform: translate(0, -50%); left: 0.85em; width: 0.1em; height: 0.1em; border-radius: 50%;">
                            </div><span style="padding-left: 1.9em;">{{ priority.title ? priority.title : 'Blank' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: 6.4px;" @click="openPopover('filter')">
                    <span style="margin-right: -3.5px; margin-bottom:2px;" v-html="getSvg('filter')"
                        class="span-filter"></span>Filter
                </span>
            </template>
        </el-popover>
        <!-- <el-popover ref="sortPopover" placement="bottom" trigger="click" :show-arrow="false">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 0; gap: 0.3em;" @click="openPopover('sort')">
                    <span v-html="getSvg('sortBig')" class="span-sort"></span>Sort
                </span>
            </template>
        </el-popover> -->
        <el-popover ref="hidePopover" placement="bottom" trigger="click" :show-arrow="false"
            popper-style="width: 264px; padding: 15px; padding-left: 0px; padding-right: 0px;">
            <div class="hide-filter">
                <p style="color: rgb(21, 21, 21); text-align: left; padding-bottom: 20px; padding-left: 30px;">Choose
                    columns to display</p>
                <div v-for="cmp in currBoard.cmpConfig"
                    style="display: flex; padding-bottom: 10px;justify-content: space-between;">
                    <label style="margin-left: 30px;" :for="cmp.type">{{ cmp.title }}</label>
                    <input style="margin-right: 30px; width: 1.25em; height: 1.25em; font-weight: 100;" type="checkbox"
                        v-model="hiddenComponents[cmp.type]" :id="cmp.type" @change="applyHideFilters" />
                </div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: 0; gap: 0.4em;" @click="openPopover('hide')">
                    <span style="margin-left: -0.5em; margin-top: 0px;" v-html="getSvg('hide')"
                        class="span-hide"></span>Hide
                </span>
            </template>
        </el-popover>
    </div>
</template>

<script>
import { utilService } from '../services/util.service'
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
            },
            hiddenComponents: {
                Status: true,
                Priority: true,
                Members: true,
                Date: true,
                Timeline: true,
                Number: true,
                Text: true,
                Attachments: true
            },
            itemsTotal: 0,
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
            return allStatuses
        },
        allPriority() {
            const board = this.modifiedBoard.groups ? this.modifiedBoard : this.currBoard
            if (!board || !board.priorityLabelConfig) return []
            const allPriorities = JSON.parse(JSON.stringify(board.priorityLabelConfig))
            return allPriorities
        },
        itemsShown() {
            if (!Object.keys(this.modifiedBoard).length) return 'all'
            return this.modifiedBoard.groups.flatMap(group => group.tasks).length
        },
        isOnBoard() {
            const route = this.$route.path.split('/')
            return route[route.length - 1] === "kanban" ? false : true
        }
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
        setPersonFilter(memberId) {
            if (this.activeMemberId === memberId) {
                this.activeMemberId = ''
                this.$store.commit('setFilteredBoard', { filteredBoard: this.currBoard })
                return
            } else { this.activeMemberId = memberId }
            this.filterByPerson()
        },
        filterByPerson() {
            const modifiedBoard = JSON.parse(JSON.stringify(this.currBoard))

            modifiedBoard.groups.forEach(group => {
                group.tasks = group.tasks.filter(task =>
                    task.Members && task.Members.some(member => member._id === this.activeMemberId)
                )
            })

            console.log(modifiedBoard)
            this.modifiedBoard = modifiedBoard
            this.$store.commit('setFilteredBoard', { filteredBoard: modifiedBoard })
        },
        filterByText(searchText) {
            const modifiedBoard = JSON.parse(JSON.stringify(this.currBoard))

            modifiedBoard.groups = modifiedBoard.groups.filter(group => {
                if (this.containsSearchText(group.title, searchText)) return true

                group.tasks = group.tasks.filter(task => {
                    if (this.containsSearchText(task.title, searchText) ||
                        this.containsSearchText(task.Number, searchText) ||
                        this.containsSearchText(task.Text, searchText) ||
                        this.containsSearchText(task.Status.title, searchText) ||
                        this.containsSearchText(task.Priority.title, searchText) ||
                        this.containsSearchText(this.formatDate(task.Date), searchText) ||
                        this.containsSearchText(this.formatDate(task.Timeline.startDate), searchText) ||
                        this.containsSearchText(this.formatDate(task.Timeline.dueDate), searchText)) return true

                    if (task.Members.some(member => this.containsSearchText(member.fullname, searchText))) return true

                    return false
                })
                return group.tasks.length > 0
            })

            this.modifiedBoard = modifiedBoard
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
        applyHideFilters() {
            this.filterCmps()
        },
        filterCmps() {
            const modifiedBoard = JSON.parse(JSON.stringify(this.currBoard))
            modifiedBoard.cmpConfig = modifiedBoard.cmpConfig.filter(cmp => this.hiddenComponents[cmp.type])
            this.modifiedBoard = modifiedBoard
            this.$store.commit('setFilteredBoard', { filteredBoard: modifiedBoard })
        },
        getDebouncedFilterText() {
            return utilService.debounce(() => {
                this.filterByText(this.searchText)
            }, 500)
        },
        onClearFilter() {
            this.$store.commit('setFilteredBoard', { filteredBoard: this.currBoard })
            this.multiFilter = {
                members: [],
                groups: [],
                tasks: [],
                status: [],
                priority: []
            }
            this.modifiedBoard = this.currBoard
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
                if ({ ...newValue } && this.board && this.board.groups) this.itemsTotal = { ...newValue }.groups.flatMap(group => group.tasks).length
                utilService.debounce(() => {
                    this.filterByText(this.searchText)
                }, 500)
                this.applyMultiFilter()
                if (this.activeMemberId) this.filterByPerson()
            }
        },
        multiFilter: {
            handler() {
                this.applyMultiFilter()
            },
            deep: true,
        },
        searchText: {
            immediate: true,
            handler() {
                const debouncedFilterText = this.getDebouncedFilterText()
                debouncedFilterText()
            },
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