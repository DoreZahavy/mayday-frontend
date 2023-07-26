<script>
import { boardService } from "@/services/board.service.js";
import Group from '@/cmps/Group.vue'
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import { svgService } from '../services/svg.service'

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
      this.$store.dispatch({ type: 'applyDragGrp', dragResult: dropResult })
    },

    saveTask(groupId, taskData) {
      this.$store.dispatch({ type: 'saveTask', groupId, taskData })
    },
    saveGroup(groupId, title) {
      // console.log('title:', title)
      this.$store.dispatch({ type: 'saveGroup', groupId, title })
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: 'removeGroup', groupId })

    },
    removeTask(groupId, taskId) {
      console.log('groupId:', groupId)
      console.log('taskId:', taskId)
      this.$store.dispatch({ type: 'removeTask', groupId, taskId })

    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }

  }
}
</script>

<template>
  <Container @drop="onDropGrp" class="groups table" v-if="board">
    <Draggable class="grp-scroll" v-for="(group, idx) in board.groups" :key="group._id">
      <button @click="removeGroup(group._id)">REMOVE GRP</button>


      <Group :group="group" :idx="idx"  class="group"
        @saveGroup="saveGroup(group._id, $event)"
        @saveTask="saveTask(group._id, $event)" 
        @removeTask="removeTask(group._id, $event)"></Group>
    </Draggable>
    <!-- <div @click="saveGroup" class="add-group-btn" v-html="getSvg('addGroup')"></div> -->

    <button @click="saveGroup" class="add-group-btn">
      <div v-html="getSvg('addGroup')"></div>
      <span>Add new group</span>
    </button>

  </Container>
</template>


