<template>
  <section class="date">
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
      const d = new Date(this.pickedDate)
      return `${d.getDate()}/${d.getMonth() + 1}`
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
