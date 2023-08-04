<template>
    <div class="checkbox-modal">
        <div class="task-count">
            {{ totalTaskCount }}
        </div>
        <div class="task-info-container">
            <h1>
                {{ tasks }}
            </h1>
            <div class="flex align-center">
                <div v-for="group in checkedTasksGroups" class="task-pebble-container">
                    <div v-for="taskId in group.taskIds" class="task-pebble" :style="{ background: group.groupColor }">
                    </div>
                </div>
            </div>
        </div>
        <div v-html="getSvg('xButton')" class="close-modal flex align-center justify-center" @click="uncheckAll">

        </div>
    </div>
</template>
<script>
import { svgService } from '../services/svg.service'
export default {
    props: {
        checkedTasksGroups: Array,
    },
    created() {

    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        uncheckAll(){
            this.$emit('uncheckAll')
        }
    },
    computed: {
        tasks() {
            if (this.checkedTasksGroups.length === 1) return 'Task selected'
            else return 'Tasks selected'
        },
        totalTaskCount() {
            let taskCount = 0
            this.checkedTasksGroups.forEach(group => {
                group.taskIds.forEach(taskId => { taskCount++ })
            })
            this.$emit('toggleSelectAll')
            return taskCount
        }
    }
}
</script>