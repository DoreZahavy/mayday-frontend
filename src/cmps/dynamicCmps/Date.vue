<template>
  <section style=" position: relative; height: 100%; width: 100%; text-align: center;" class="date-container">
    <span class="date">{{ date }}</span>
    <el-date-picker v-model="pickedDate" type="date" format="dd/MM" @change="onDateChange" ref="datePicker">
    </el-date-picker>
  </section>
</template>

<script>
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
    }
  }
}
</script>
