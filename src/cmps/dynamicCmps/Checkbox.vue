<template>
    <div class="checkbox">
      <input type="checkbox" >
    </div>
  </template>
  
  <script>
  export default {
    name: "side-indicator",
    props: {
      info: null,
    },
  };
  </script>
  
  <style>
  .checkbox {
    width: 1rem;
    height: 1rem;
    transition: 0.2s;
    transition-delay: 0.1ms;
    /* background-color: lightgray; */
  }
  </style>