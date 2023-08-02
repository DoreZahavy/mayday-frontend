<template>
    <div class="board-filter-container">
        <span class="blue-button new-task-button" @click="onAddTask">New Item</span>
        <span class="span-common span-search">
            <span v-html="getSvg('search')" class="span-common"></span>Search
        </span>
        <el-popover ref="personPopover" placement="bottom" trigger="click" :show-arrow="false" @show="handlePopoverOpen"
            @hide="handlePopoverClose">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 0px; gap: 4px;" @click="openPopover('person')">
                    <span v-html="getSvg('personFilter')" class="span-person"></span>Person
                </span>
            </template>
        </el-popover>
        <el-popover ref="filterPopover" placement="bottom" trigger="click" :show-arrow="false" @show="handlePopoverOpen"
            @hide="handlePopoverClose">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 6.4px;" @click="openPopover('filter')">
                    <span v-html="getSvg('filter')" class="span-filter"></span>Filter
                </span>
            </template>
        </el-popover>
        <el-popover ref="sortPopover" placement="bottom" trigger="click" :show-arrow="false" @show="handlePopoverOpen"
            @hide="handlePopoverClose">
            <div></div>
            <template #reference>
                <span class="span-common" style="margin-top: 0; gap: 0.3em;" @click="openPopover('sort')">
                    <span v-html="getSvg('sortBig')" class="span-sort"></span>Sort
                </span>
            </template>
        </el-popover>
        <el-popover ref="hidePopover" placement="bottom" trigger="click" :show-arrow="false" @show="handlePopoverOpen"
            @hide="handlePopoverClose">
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
    methods: {
        onAddTask() {
            this.$emit('addTask')
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    }
}
</script>