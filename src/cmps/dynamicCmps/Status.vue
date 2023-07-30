<template>
  <el-tooltip placement="bottom" trigger="click" effect="light" @show="handleTooltipOpen" @hide="handleTooltipClose">
    <template #content>
      <div v-for="label in statusLabelConfig" :key="label.title" :class="label.color" class="status-option"
        @click.stop="onUpdateStatus(label)">
        {{ label.title }}
      </div>
    </template>
    <div v-if="status" class="status status-content fs18" :class="status.color">{{ status.title }}</div>
  </el-tooltip>
  <input ref="taskFocusedSwitch" type="text" style="opacity: 0; position: absolute; pointer-events: none;">
</template>

<script>
export default {
  name: "Status",
  props: {
    info: Object,
  },
  data() {
    return {
      status: { ...this.info },
      statusLabelConfig: this.$store.getters.statusLabelConfig
    }
  },
  methods: {
    onUpdateStatus(newStatus) {
      this.status = newStatus
      this.$emit('update', JSON.parse(JSON.stringify(this.status)))
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
