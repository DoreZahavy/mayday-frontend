<script>
export default {
    data() {
        return {
            filterBy:''
        }
    },
    methods:{
        filter(){

            this.$emit('filter', this.filterBy)
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
    <!-- <div v-html=""></div> -->
    <input type="search" v-model="filterBy">
</template>