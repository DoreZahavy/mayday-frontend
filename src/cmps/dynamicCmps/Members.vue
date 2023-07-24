<template>
    <section class="members-list">
      <MemberPreview v-for="(member, idx) in info" :key="idx" :member="member" />
    </section>
  </template>
  
  <script>
  import MemberPreview from "@/cmps/MemberPreview.vue";
  export default {
    name: "members",
    emits: ["update"],
    props: {
      info: Array,
    },
  
    components: {
      MemberPreview,
    },
  };
  </script>
  
  <style >
  p {
    margin: 0;
  }
  
  .members-list {
    display: inline-flex;
    justify-items: center;
    flex-direction: row;
    /* background-color: lightseagreen; */
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .members {
    /* background-color: lightseagreen; */
  }
  </style>