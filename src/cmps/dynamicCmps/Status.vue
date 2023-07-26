<template>
  <p v-if="status" class="status">{{ status }}</p>
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
      this.$emit({ cmpType: 'status', data: this.status })
    }
  }
}
</script>
  
<style>
.status {
  /* background-color: lightpink; */
  height: 100%;
}
</style>