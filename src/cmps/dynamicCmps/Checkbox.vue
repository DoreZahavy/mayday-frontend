<template>
  <div class="d-cmp checkbox fs16">
    <input type="checkbox" :id="stringId">
    <label :for="stringId" class="checkbox-label"></label>
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
  