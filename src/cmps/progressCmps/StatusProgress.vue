<template>
  <div v-if="group" class="status-progress-bar">
    <el-tooltip v-for="status in  statusCounts " :key="status.title" placement="top" popper-class="custom-tooltip">
      <template #content>
        <span v-html="tooltipContent(status)"></span>
      </template>
      <div class="progress-segment" :class="status.color" :style="{ width: status.percentage + '%' }">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'StatusProgress',
  props: { group: Object },
  computed: {
    statusCounts() {
      let statuses = {}
      for (let task of this.group.tasks) {
        // console.log(task.Status)
        let status = task.Status.title
        if (!(status in statuses)) {
          statuses[status] = { count: 0, color: task.Status.color, title: task.Status.title }
        }
        statuses[status].count++
      }

      let totalTasks = this.group.tasks.length
      for (let status in statuses) {
        statuses[status].percentage = (statuses[status].count / totalTasks) * 100
      }

      return Object.values(statuses)
    }
  },
  methods: {
    tooltipContent(status) {
      return `${status.title ? status.title : ''} ${status.count}/${this.group.tasks.length}&nbsp;&nbsp;&nbsp;${status.percentage.toFixed(2)}%`
    }
  }
}
</script>

<style scoped>
.status-progress-bar {
  display: flex;
  align-items: center;
  margin-top: 5.48px;
  margin-left: 0.2em;
  height: 67.93%;
  width: 92.8%;
  background-color: #c4c4c4;
  cursor: pointer;
}

.progress-segment {
  height: 100%;
  transition: .25s ease;
}

.progress-segment:hover {
  border-radius: 2px;
  transform: scaleY(1.2);
  transition: .0005s ease;
}
</style>