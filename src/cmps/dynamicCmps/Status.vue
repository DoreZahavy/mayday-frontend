<template>
  <td v-if="status" class="status" @click="onSetStatus">
    <div class="status-content">{{ status }}</div>
  </td>
</template>
  
<script>
export default {
  name: "status",
  props: {
    info: String,
  },
  data() {
    return {
      status: this.info
    }
  },
  methods: {
    onSetStatus() {
      this.$emit("update", { cmpType: 'status', data: this.status })
    }
  }
}
</script>

<style scoped>
.status {
  background-color: #4caf50;
  /* green */
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.status:hover:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  z-index: 2;
}

.status-content {
  position: relative;
  z-index: 1;
}
</style>
