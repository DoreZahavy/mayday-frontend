<template>
    <div class="board-filter-container">
        <span class="blue-button new-task-button" @click="onAddTask">New Item</span>
        <span v-if="!editing" class="span-common span-search" @click="enableEditing">
            <span v-html="getSvg('search')" class="span-common"></span>Search
        </span>
        <span v-else style="position: relative; margin-top: -0.1em; margin-right: 1em"><input class="search-input"
                ref="searchInput" placeholder="Search" @blur="editing = false"
                style="height: 2.25em; width: 20em; border: 0.5px solid royalblue; background-color: transparent; border-radius: 4px; padding-left: 2.27em; font-size: 1em; padding-bottom: 1px;"><span
                v-html="getSvg('search')" class="span-common"
                style="position: absolute; left: 0.6em; top: 4.2px; z-index: -9"></span></span>
        <el-popover style="width: 800px !important" ref="personPopover" placement="bottom" trigger="click"
            :show-arrow="false" popper-class="person-popover-container">
            <div class="person-filter">
                <p>Quick person filter</p>
                <p>Filter items and subitems by person</p>
                <div><img v-for="member in members" :src="member.imgUrl" @click="filterByPerson(member._id)"></div>
            </div>
            <template #reference>
                <span class="span-common" style="margin-top: 0px; gap: 4px;" @click="openPopover('person')">
                    <span v-html="getSvg('personFilter')" class="span-person"></span>Person
                </span>
            </template>
        </el-popover>
        <el-popover ref="filterPopover" placement="bottom" trigger="click" :show-arrow="false">
            <div class="multi-filter">filter</div>
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
import { svgService } from '../services/svg.service';
export default {
    props: {
        board: Object
    },
    emits: ['addTask', 'filter'],
    data() {
        return {
            editing: false,
            modifiedBoard: {}
        }
    },
    computed: {
        members() {
            return this.board ? this.board.members : null
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
            this.$refs[`${popoverName}Popover`].show()
        },
        enableEditing() {
            this.editing = true
            this.$nextTick(() => {
                this.$refs.searchInput.focus()
            })
        },
        filterByPerson(memberId) {
            const modifiedBoard = JSON.parse(JSON.stringify(this.board))

            modifiedBoard.groups.forEach(group => {
                group.tasks = group.tasks.filter(task =>
                    task.Members && task.Members.some(member => member._id === memberId)
                )
            })

            console.log(modifiedBoard)
        }
    }
}
</script>

<style scoped>
.search-input:focus {
    outline: none !important;
    font-family: figtree;
}
</style>