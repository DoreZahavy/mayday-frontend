<script>
import { svgService } from '@/services/svg.service'

export default {
    data() {
        return {
            filterBy: ''
        }
    },
    methods: {
        filter() {

            this.$emit('filter', this.filterBy)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true,
        },
    },
}
</script>
<template>
    <section class="sidebar-filter">
        <span v-html="getSvg('search')" class="search-icon-wrapper"></span>
        <input type="search" v-model="filterBy" placeholder="Search">
    </section>
</template>