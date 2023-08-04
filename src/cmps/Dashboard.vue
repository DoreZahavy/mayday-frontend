<template>
    <div class="flex">
        <BarChart :groups="groups"/>
    </div>
</template>
<script>
import BarChart from './dashboardCmps/BarChart.vue';

export default{
    data(){
        return{
            groups:[]
        }
    },
    components:{
        BarChart
    },
    created(){
        this.groups = this.$store.getters.board
        console.log(this.groups)
    },
    computed:{
    }
}
</script>