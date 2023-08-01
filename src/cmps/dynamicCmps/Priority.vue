<template>
  <el-tooltip placement="bottom" trigger="click" effect="light" @show="handleTooltipOpen" @hide="handleTooltipClose">
    <template #content>
      <div v-for="label in priorityLabelConfig" :key="label.title" :class="label.color" class="status-option"
        @click.stop="onUpdatePriority(label)">
        {{ label.title }}
      </div>
    </template>
    <span v-if="priority" class="status status-content fs18" :class="priority.color">{{ priority.title }}</span>
  </el-tooltip>
  <input ref="taskFocusedSwitch" type="text" style="opacity: 0; position: absolute; pointer-events: none;">
</template>

<script>
export default {
  name: "Priority",
  emits: ['update'],
  props: {
    info: Object,
    groupColor: String
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
      this.$emit('update', JSON.parse(JSON.stringify(this.priority)))
    },
    handleTooltipOpen() {
      requestAnimationFrame(() => {
        this.$refs.taskFocusedSwitch.focus()
      })
    },
    handleTooltipClose() {
      requestAnimationFrame(() => {
        this.$refs.taskFocusedSwitch.blur()
      })
    }
  }
}
</script>