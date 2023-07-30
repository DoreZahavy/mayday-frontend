<template>
  <div class="d-cmp checkbox fs16">
    <label :for="stringId" class="checkbox-label"></label>
    <input type="checkbox" :id="stringId">
  </div>
</template>
  
<script>

export default {
  name: "side-indicator",
  props: ['checkBoxId']
  ,
  created() {
  },
  computed: {
    stringId() {
      return `checkbox${this.checkBoxId}`
    }
  }
};
</script>
  