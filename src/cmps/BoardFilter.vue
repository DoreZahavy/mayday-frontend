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
        <el-popover ref="personPopover" placement="bottom" trigger="click" :show-arrow="false">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 0px; gap: 4px;" @click="openPopover('person')">
                    <span v-html="getSvg('personFilter')" class="span-person"></span>Person
                </span>
            </template>
        </el-popover>
        <el-popover ref="filterPopover" placement="bottom" trigger="click" :show-arrow="false">
            <div></div>
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
            <div></div>
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
    emits: ['addTask', 'filter'],
    data() {
        return {
            editing: false
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