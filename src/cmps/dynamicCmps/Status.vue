<template>
  <el-tooltip placement="bottom" trigger="click" effect="light">
    <template #content>
      <div v-for="status in statusOptions" :key="status" :class="status.class" class="status-option"
        @click.stop="onSetStatus(status)">
        {{ status.txt }}
      </div>
    </template>
    <div v-if="status" class="status status-content">{{ status.txt }}</div>
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
      statusOptions: this.$store.getters.statusOptions
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

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-right: 10px solid white;
    width: 0.1px;
    height: 0.1px;
    z-index: 2;
    transition: transform 0.9s ease;
  }

  &:hover:before {
    opacity: 1;
  }
}

.status-content {
  position: relative;
  z-index: 1;
}

.status-option {
  padding: 5px;
  cursor: pointer;
}
</style>