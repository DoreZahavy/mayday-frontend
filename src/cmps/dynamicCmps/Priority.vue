<template>
  <p v-if="priority" class="priority">{{ priority }}</p>
</template>
  
<script>
export default {
  name: "priority",
  props: {
    info: String,
  },
  data() {
    return {
      priority: this.info
    }
  },
  methods: {
    onSetPriority() {
      this.$emit({ cmpType: 'priority', data: this.priority })
    }
  }
}
</script>
  
<style>
.priority {
  /* background-color: lightskyblue; */
  height: 100%;
}
</style>