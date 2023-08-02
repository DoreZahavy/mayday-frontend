<template>
    <div class="checkbox-modal">
        <div class="task-count">
            {{ checkedTasks.length }}
        </div>
        <div class="task-info-container">
            <h1>
                {{ tasks }}
            </h1>
            <div class="flex align-center">
                <div v-for="task in checkedTasks" class="task-pebble" :style="{ background: task.color }"></div>
            </div>
        </div>
        <div v-html="getSvg('xButton')" class="close-modal flex align-center justify-center">

        </div>
    </div>
</template>
<script>
import { svgService } from '../services/svg.service'
export default {
    props: {
        checkedTasks: Array
    },
    created() {

    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
    computed: {
        tasks() {
            if (this.checkedTasks.length === 1) return 'Task selected'
            else return 'Tasks selected'
        }
    }
}
</script>