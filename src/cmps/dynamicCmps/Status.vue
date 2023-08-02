<template>
  <el-popover ref="popover" placement="bottom" trigger="click" @show="handleTooltipOpen" @hide="handleTooltipClose">
    <div v-for="label in statusLabelConfig" :key="label.title" :class="label.color" class="status-option"
      @click="onUpdateStatus(label)">
      {{ label.title }}
    </div>
    <template #reference>
      <div v-if="status" class="status status-content fs18" :class="status.color">
        {{ status.title }}
      </div>
    </template>
  </el-popover>
  <input ref="taskFocusedSwitch" type="text" style="opacity: 0; position: absolute; pointer-events: none;">
</template>

<script>
export default {
  name: "Status",
  emits: ['update'],
  props: {
    info: Object,
    groupColor: String
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