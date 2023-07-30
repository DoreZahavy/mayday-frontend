<script>
import { svgService } from '@/services/svg.service'

export default {
    data() {
        return {
            filterBy: '',
            editing: false
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        startEditing() {
            this.editing = true
        },
        stopEditing() {
            this.editing = false
            this.$emit('filter', this.filterBy)
        },
        clearText() {
            this.filterBy = ''
            this.showButton = false
            this.$emit('filter', this.filterBy)
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true,
        },
    },
    computed: {
        showButton() {
            return this.filterBy.length > 0
        }
    }
}
</script>
<template>
    <section class="sidebar-filter">
        <span v-html="getSvg('search')" class="search-icon-wrapper"></span>
        <input type="search" v-model="filterBy" placeholder="Search">
        <div v-if="showButton" class="reset-text" @click="clearText">
            <span class="x-icon" v-html="getSvg('xButton')">
            </span>
        </div>
    </section>
</template>