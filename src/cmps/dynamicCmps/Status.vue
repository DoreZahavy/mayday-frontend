<template>
  <el-popover ref="popover" placement="bottom" trigger="click" @show="handleTooltipOpen" @hide="handleTooltipClose"
    class="status-popover-container">
    <!-- <div v-if="!labelEditing"> -->
    <!-- <div> -->
    <div v-for="label in statusLabelConfig" :key="label.title" :class="label.color" class="status-option"
      @click="onUpdateStatus(label)">
      {{ label.title }}
    </div>
    <!-- <span @click="labelEditing = true"><span v-html="getSvg('text')"></span>Edit Labels</span> -->
    <!-- </div> -->
    <!-- <div v-else>
      cutsom labels
    </div> -->
    <template #reference>
      <div v-if="status" class="status status-content fs18" :class="status.color">
        {{ status.title }}
      </div>
    </template>
  </el-popover>
  <input ref="taskFocusedSwitch" type="text" style="opacity: 0; position: absolute; pointer-events: none;">
</template>

<script>
import { svgService } from '../../services/svg.service'
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
      statusLabelConfig: this.$store.getters.statusLabelConfig,
      labelEditing: false
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
      this.labelEditing = false
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }
  },
  watch: {
    info() {
      this.status = { ...this.info }
      // console.log('this.info:', this.info)
    }
  }
}
</script>