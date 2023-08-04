<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    props:{
        groups:Array
    },
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    mounted(){
        console.log(this.groups)
        // this.setBarChartData()
    },
    methods:{
        setBarChartData(){
            let labels = []
            this.board.groups.forEach(group => {
                group.tasks.forEach(task=>{
                    console.log(task.status.title)
                })
            });
        }
    }
}
</script>
  