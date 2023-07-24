<template>
  <p class="title">{{ info }}</p>
</template>
  
<script>
export default {
  name: "taskTitle",
  props: ['info'],
  data() {
    return {};
  },
};
</script>
  
<style>
.title {
  text-align: start;
  padding-left: 5%;
  /* background-color: lightblue; */
}
</style>