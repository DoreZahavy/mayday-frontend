<template>
  <el-tooltip placement="bottom" trigger="click" effect="light">
    <template #content>
      <div v-for="label in statusLabelConfig" :key="label.title" :class="label.class" @click.stop="onSetStatus(status)">
        {{ label.title }}
      </div>
    </template>
    <div v-if="status" class="status status-content" :class="status.class">{{ status.title }}</div>
  </el-tooltip>
</template>

<script>
export default {
  name: "Status",
  props: {
    info: String,
  },
  data() {
    return {
      status: this.info,
      statusLabelConfig: this.$store.getters.statusLabelConfig
    }
  },
  methods: {
    onSetStatus(newStatus) {
      this.status = newStatus
      this.$emit('update', { cmpType: 'status', data: this.status })
    }
  }
}
</script>