<template>
  <el-popover ref="popover" placement="bottom" trigger="click" @show="handleTooltipOpen" @hide="handleTooltipClose"
    class="status-popover-container">
    <div v-for="label in priorityLabelConfig" :key="label.title" :class="label.color" class="status-option"
      @click="onUpdatePriority(label)">
      {{ label.title }}
    </div>
    <template #reference>
      <div v-if="priority" class="status status-content fs18" :class="priority.color">
        {{ priority.title }}
      </div>
    </template>
  </el-popover>
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
      this.$refs.popover.hide()
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
    },
  },
}
</script>