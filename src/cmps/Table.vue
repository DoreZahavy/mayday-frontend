<script>
import { boardService } from "@/services/board.service.js";
import Group from '@/cmps/Group.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
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
    InPlaceEdit,
    Container,
    Draggable
  },
  created() {

  },
  methods: {
    onDropGrp(dropResult) {
      this.$store.commit({ type: 'applyDragGrp', dragResult: dropResult })
    },

  // updateTask(data){

  // },
    addGroup() {
      this.$store.dispatch({type:'addGroup'})
    },
    removeGroup(groupId) {
      this.$store.dispatch({type:'removeGroup',groupId})

    }

  }
}
</script>

<template>
  <Container @drop="onDropGrp" class="groups table" v-if="board">
    <Draggable class="grp-scroll" v-for="(group, idx) in board.groups" :key="group._id">
      <button @click="removeGroup(group._id)">REMOVE GRP</button>
      <Group :group="group" :idx="idx"></Group>
    </Draggable>
    <!-- <button @click="addGroup">ADD GRP</button> -->
  </Container>
</template>


