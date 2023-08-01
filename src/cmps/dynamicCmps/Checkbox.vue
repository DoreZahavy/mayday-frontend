<template>
  <div class="d-cmp checkbox fs16">
    <input type="checkbox" :id="stringId">
    <label :for="stringId" class="checkbox-label" v-html="getSvg('checkmark')"></label>
  </div>
</template>
  
<script>
import { svgService } from '@/services/svg.service'
export default {
  name: "side-indicator",
  props: ['checkBoxId'],
  created() {
  },
  computed: {
    stringId() {
      return `checkbox${this.checkBoxId}`
    }
  },
  methods:{
    getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
  }
};
</script>
  