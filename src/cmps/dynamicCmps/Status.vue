<template>
  <p v-if="status" class="status">{{ status }}</p>
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
      statusOptions: [{ txt: "Done", class: "green" }, { txt: "Done", class: "green" }, { txt: "Done", class: "green" }]
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
  /* background-color: lightpink; */
  height: 100%;
}
</style>
