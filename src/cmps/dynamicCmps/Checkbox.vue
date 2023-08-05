<template>
  <div class="d-cmp checkbox fs16">
    <input type="checkbox" v-model="checked" :id="'checkbox' + taskId" @change="onCheckedChange"
      :ref="'checkbox' + taskId">
    <label :for="taskId" class="checkbox-label" v-html="getSvg('checkmark')"></label>
  </div>
</template>
  
<script>
import { svgService } from '@/services/svg.service'
export default {
  name: "checkbox",
  props: {
    taskId: String,
    isChecked: String
  },
  data() {
    return {
      checked: false
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    onCheckedChange() {
      if(!this.taskId) return
      if (this.checked) this.$emit('checked', this.taskId)
      else this.$emit('unchecked', this.taskId)
    }, 
  },
  watch: {
    checked() {
    },
    isChecked() {
      this.checked = this.isChecked ? true : false
    }
  }
}
</script>
  