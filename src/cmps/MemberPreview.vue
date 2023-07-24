<template>
    <section v-if="member">
      <section v-if="member.imgUrl" class="member-priview">
        <img :src="member.imgUrl" alt="" />
      </section>
      <article :style="{ background: memberColor }" v-else class="member-priview">
        {{ member.name.substring(0, 1).toUpperCase() }}
      </article>
    </section>
  </template>
  
  <script>
  export default {
    name: "member-priview",
    props: {
      member: Object,
    },
  
    computed: {
      memberColor() {
        return this.member.color;
      },
    },
  };
  </script>
  
  <style>
  .member-priview {
    color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline-start: -10px;
  }
  </style>