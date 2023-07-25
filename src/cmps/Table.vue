<script>
import { boardService } from "@/services/board.service.js";
import Group from '@/cmps/Group.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
export default {
  data() {
    return {
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    groups() {
      return this.$store.getters.groups
    },

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

    removeGrp() {

    },

    addGrp() {
      const order = this.$store.getters.cmpOrder
    console.log('orrder:', order)
    },

  }
}
</script>

<template>
  <Container @drop="onDropGrp" class="groups table" v-if="board">
    <Draggable class="grp-scroll" v-for="(group, idx) in board.groups" :key="group._id">
      <button @click="removeGrp(idx, $event)">REMOVE GRP</button>
      <Group :group="group" :idx="idx"></Group>
    </Draggable>
    <button @click="addGrp">ADD GRP</button>
  </Container>
</template>


