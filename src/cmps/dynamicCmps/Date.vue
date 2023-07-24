<template>
    <section class="date">
      <p>{{ info }}</p>
    </section>
  </template>
  
  <script>
  export default {
    name: "date",
  
    props: {
      info: String,
    },
  };
  </script>
  
  <style>
  .date {
    /* background-color: lightcoral; */
  }
  </style>