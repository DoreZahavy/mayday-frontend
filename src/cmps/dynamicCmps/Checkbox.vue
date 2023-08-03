<template>
  <div class="d-cmp checkbox fs16">
    <input type="checkbox" v-model="checked" :id="'checkbox' + taskId" @change="onCheckedChange"
      :ref="'checkbox' + taskId">
    <label :for="stringId" class="checkbox-label" v-html="getSvg('checkmark')"></label>
  </div>
</template>
  
<script>
import { svgService } from '@/services/svg.service'
export default {
  name: "checkbox",
  props: {
    taskId: String,
  },
  data() {
    return {
      checked: false
    }
  },
  created() {
    const ref = 'checkbox' + this.taskId
    this.$refs[ref].addEventListener('change', onElementCheckedChange);
  },
  computed: {
    stringId() {
      return `checkbox${this.taskId}`
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    onCheckedChange() {
      if (this.checked) this.$emit('checked', this.taskId)
      else this.$emit('unchecked', this.taskId)
    },
    onElementCheckedChange() {
      console.log('I changed my value :DDDDD')
    }
  },
  watch: {
    checked() {
      console.log(this.checked)
    }
  }
}
</script>
  