<template>
  <div v-if="group" class="priority-progress-bar">
    <el-tooltip v-for="priority in priorityCounts" :key="priority.title" placement="top" popper-class="custom-tooltip">
      <template #content>
        <span v-html="tooltipContent(priority)"></span>
      </template>
      <div class="progress-segment" :class="priority.color" :style="{ width: priority.percentage + '%' }">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'PriorityProgress',
  props: { group: Object },
  computed: {
    priorityCounts() {
      let priorities = {}
      for (let task of this.group.tasks) {
        // console.log(task.Priority)
        let priority = task.Priority.title
        if (!(priority in priorities)) {
          priorities[priority] = { count: 0, color: task.Priority.color, title: task.Priority.title }
        }
        priorities[priority].count++
      }

      let totalTasks = this.group.tasks.length
      for (let priority in priorities) {
        priorities[priority].percentage = (priorities[priority].count / totalTasks) * 100
      }

      return Object.values(priorities)
    }
  },
  methods: {
    tooltipContent(priority) {
      return `${priority.title ? priority.title : ''} ${priority.count}/${this.group.tasks.length}&nbsp;&nbsp;&nbsp;${priority.percentage.toFixed(2)}%`
    }
  }
}
</script>

<style scoped>
.priority-progress-bar {
  display: flex;
  align-items: center;
  margin-top: 5.48px;
  margin-inline: .6em;
  height: 67.93%;
  width: 89.2%;
  background-color: #c4c4c4;
  cursor: pointer;
}

.progress-segment {
  height: 100%;
  transition: .2s ease;
}

.progress-segment:hover {
  border-radius: 2px;
  transform: scaleY(1.2);
  transition: .0005s ease;
}
</style>