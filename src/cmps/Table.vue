<script>
import { boardService } from "@/services/board.service.js";
import Group from '@/cmps/Group.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
export default {
  data() {
    return {
      // groups:[]
    }
  },
  computed: {
    groups() {
      return this.$store.getters.groups
    }
  },
  components: {
    Group,
    Container,
    Draggable
  },
  created() {
  },
  methods: {
    onDropGrp(dropResult) {
      this.$store.commit({ type: 'applyDragGrp', dragResult: dropResult })
    },
  }
}
</script>

<template>
  <Container @drop="onDropGrp" class="groups">
    <Draggable class="grp-scroll" v-for="(group, idx) in groups" :key="group">
      <Group :group="group" :idx="idx"></Group>
    </Draggable>
  </Container>
</template>

<style>
.grp-scroll {
  overflow-y: scroll;
}
</style>
