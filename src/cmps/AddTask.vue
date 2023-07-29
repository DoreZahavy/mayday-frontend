<template>
    <span class="add-task">
        <span v-if="!editing">
            {{ placeholder }}
        </span>
    </span>
</template>
<script>
export default{
    name:'addTask',
    props:{
        placeholder:string
    },
    data(){
        return{
            editing:false,
        }
    }
}
</script>