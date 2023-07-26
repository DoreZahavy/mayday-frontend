<template>
  <section class="date">
    <p>{{ date }}</p>
  </section>
</template>
  
<script>
export default {
  name: "date",

  props: {
    info: Number,
  },
  computed: {
    date() {
      const d = new Date(this.info)
      return `${d.getDate()}/${d.getMonth()}`
    }
  }
}
</script>
