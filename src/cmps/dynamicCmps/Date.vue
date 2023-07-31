<template>
  <article style=" position: relative; height: 100%; width: 100%; text-align: center;" class="date-container fs16">
    <div class="flex justify-center align-center" style="height:100%">
      <span v-if="pickedDate" class="date">{{ formattedDate }}</span>
      <div v-else>
        <span class="icon plus-icon" v-html="getSvg('plusSign')"></span>
        <span class="icon date-picker-icon" v-html="getSvg('datePicker')"></span>
      </div>
    </div>
    <el-date-picker v-model="pickedDate" type="date" @change="onDateChange" ref="datePicker">
    </el-date-picker>
    <div v-if="pickedDate" class="reset-text" @click="clearDate">
      <span class="x-icon" v-html="getSvg('xButton')">
      </span>
    </div>
  </article>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
  name: "Date",

  props: ['info'],
  data() {
    return {
      pickedDate: this.info
    }
  },
  computed: {
    formattedDate() {
      let date = new Date(this.pickedDate)
      const currentYear = (new Date()).getFullYear()
      const options = { month: 'short', day: 'numeric' }
      if (date.getFullYear() !== currentYear) {
        options.year = 'numeric'
      }
      return date.toLocaleDateString('en-US', options)
    },
  },
  methods: {
    onDateChange(date) {
      this.$emit('update', date.valueOf())
    },
    clearDate() {
      this.pickedDate = null
      this.$emit('update', null)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }
  }
}
</script>
