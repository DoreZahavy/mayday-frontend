<template>
  <el-tooltip placement="bottom" trigger="click" effect="light">
    <template #content>
      <div v-for="label in priorityLabelConfig" :key="label.title" :class="label.color" class="status-option"
        @click.stop="onUpdatePriority(label)">
        {{ label.title }}
      </div>
    </template>
    <div v-if="priority" class="status status-content" :class="priority.color">{{ priority.title }}</div>
  </el-tooltip>
</template>

<script>
export default {
  name: "Priority",
  props: {
    info: Object,
  },
  data() {
    return {
      priority: { ...this.info },
      priorityLabelConfig: this.$store.getters.priorityLabelConfig
    }
  },
  methods: {
    onUpdatePriority(newPriority) {
      this.priority = newPriority
      console.log(newPriority)
      this.$emit('update', JSON.parse(JSON.stringify(this.priority)))
    }
  }
}
</script>