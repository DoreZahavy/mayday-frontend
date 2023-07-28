<template>
  <section style=" position: relative; height: 100%; width: 100%; text-align: center;" class="date-container">
    <div class="flex justify-center align-center" style="height:100%">
      <span v-if="pickedDate" class="date">{{ date }}</span>
      <div v-else>
        <span class="icon plus-icon" v-html="getSvg('addUser')"></span>
        <span class="icon date-picker-icon" v-html="getSvg('datePicker')"></span>
      </div>
    </div>
    <el-date-picker v-model="pickedDate" type="date" @change="onDateChange" ref="datePicker">
    </el-date-picker>
  </section>
</template>

<script>
import { svgService } from '../../services/svg.service';

export default {
  name: "Date",

  props: ['info'],
  data() {
    return {
      pickedDate: this.info
    }
  },
  computed: {
    date() {
      // const d = new Date(this.pickedDate)
      // return `${d.getDate()}/${d.getMonth() + 1}`
      let date = new Date(this.pickedDate)
      const options = { day: 'numeric', month: 'numeric' }
      return date.toLocaleString('en-gb', options)
    }
  },
  methods: {
    onDateChange(date) {
      console.log(date)
      console.log(this.info)
      this.$emit('update', date.valueOf())
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }
  }
}
</script>
