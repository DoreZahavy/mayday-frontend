<template>
  <el-tooltip placement="bottom" title="Title" :width="200" trigger="click"
    content="<span>The content can be <strong>HTML</strong></span>" raw-content>
    <div v-if="status" class="status status-content" @click="onSetStatus">{{ status }}</div>
  </el-tooltip>
</template>

<script>
export default {
  name: "status",
  props: {
    info: String,
  },
  data() {
    return {
      status: this.info,
      popoverVisible: false
    }
  },
  methods: {
    onSetStatus() {
      this.$emit("update", { cmpType: 'status', data: this.status })
    },
    setStatus(newStatus) {
      this.status = newStatus;
      this.popoverVisible = false;
      this.onSetStatus();
    }
  }
}
</script>

<style lang="scss" scoped>
$status-done: #00c875;
$status-done-hover: #48d59b;

.status {
  background-color: $status-done;
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: $status-done-hover;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-right: 10px solid white;
    border-bottom: 10px solid darken($status-done, 10%);
    opacity: 0;
    z-index: 2;
    transition: opacity 0.3s ease;
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
  padding: 10px;
  cursor: pointer;
}

.status-option.done {
  background-color: green;
}

.status-option.working {
  background-color: yellow;
}

.status-option.stuck {
  background-color: red;
}

.status-option.almost {
  background-color: orange;
}
</style>
