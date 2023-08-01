<template>
    <form class="add-task" @submit.prevent="addTask">
        <input @blur="addTask" type="text" v-model="title" placeholder="+ Add Task">
    </form>
</template>
<script>
export default {
    emits:['addTask'],
    name: 'addTask',
    props:
        { groupId: String }
    ,
    data() {
        return {
            title:''
        }
    },
    methods:{
        addTask(){
            this.$emit('addTask',this.title)
            this.title = ''
        }
    }
}
</script>