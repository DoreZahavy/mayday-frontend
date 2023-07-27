<template>
  <el-tooltip placement="bottom" trigger="click" effect="light">
    <template #content>
      <div v-for="label in statusLabelConfig" :key="label.title" :class="label.class" class="status-option"
        @click.stop="onUpdateStatus(label)">
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
      this.status = JSON.parse(JSON.stringify(newStatus))
      this.$emit('update', { cmpType: 'Status', data: this.status = JSON.parse(JSON.stringify(this.status)) })
    }
  }
}
</script>