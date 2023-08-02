<template>
  <div class="d-cmp checkbox fs16">
    <input type="checkbox" :id="stringId" v-model="checked">
    <label :for="stringId" class="checkbox-label" v-html="getSvg('checkmark')"></label>
  </div>
</template>
  
<script>
import { svgService } from '@/services/svg.service'
export default {
  name: "checkbox",
  props: {
    checkBoxId: String,
    groupColor: String
  },
  data() {
    return {
      checked: false
    }
  },
  created() {
  },
  computed: {
    stringId() {
      return `checkbox${this.checkBoxId}`
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  watch: {
    checked() {
      if (this.checked) this.$emit('checked', { _id: this.checkBoxId, color: this.groupColor })
      else this.$emit('unchecked', { _id: this.checkBoxId, color: this.groupColor })
    }
  }
}
</script>
  