<template>
  <div v-if="group" class="status-progress-bar">
    <div v-for="status in statusCounts" :key="status.title" class="progress-segment" :class="status.color"
      :style="{ width: status.percentage + '%' }">{{ status.title }}
    </div>
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
          statuses[status] = { count: 0, color: task.Status.color }
        }
        statuses[status].count++
      }

      let totalTasks = this.group.tasks.length
      for (let status in statuses) {
        statuses[status].percentage = (statuses[status].count / totalTasks) * 100
      }

      return Object.values(statuses)
    }
  }
}
</script>

<style scoped>
.status-progress-bar {
  display: flex;
  align-items: center;
  margin-top: 0.391em;
  margin-left: 0.2em;
  height: 67.93%;
  width: 92.8%;
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
  transition: .01s ease;
}
</style>