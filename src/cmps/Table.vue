<script>
import { boardService } from "@/services/board.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

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

    async updateBoard(groupId, { taskId, prop, toUpdate }) {
      try {

        await this.$store.dispatch({ type: 'updateBoard', groupId, taskId, prop, toUpdate })
        showSuccessMsg('Board updated')

      } catch (err) {
        showErrorMsg('Failed to update board')

      }
      // console.log('groupId,taskId,prop,toUpdate:', groupId,taskId,prop,toUpdate)
      // update.groupId = groupId
      // this.$store.dispatch({ type: 'updateBoard', groupId, taskId, prop, toUpdate })
    },
    async addTask(groupId, title) {
      try {
        await this.$store.dispatch({ type: 'addTask', groupId, title })
        showSuccessMsg('Task added')

      } catch (err) {
        showErrorMsg('Failed to add task')

      }
    },
    // saveGroup(groupId, title) {
    //   this.$store.dispatch({ type: 'saveGroup', groupId, title })
    // },
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch({ type: 'removeGroup', groupId })
        showSuccessMsg('Task deleted')
      } catch (err) {
        showErrorMsg('Failed to delete task')
      }

    },
    async addGroup() {
      try {
        await this.$store.dispatch({ type: 'addGroup' })
        showSuccessMsg('Group added')
      } catch (err) {
        showErrorMsg('Failed to add group')
      }
      

    },
    async removeTask(groupId, taskId) {
      try {
        await this.$store.dispatch({ type: 'removeTask', groupId, taskId })
        showSuccessMsg('Task deleted')
      } catch (err) {
        showErrorMsg('Failed to add task')
      }
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


      <Group :group="group" :idx="idx" class="group" @saveGroup="saveGroup(group._id, $event)"
        @updateTask="updateTask(group._id, $event)" @addTask="addTask(group._id, $event)"
        @removeTask="removeTask(group._id, $event)" @update="updateBoard(group._id, $event)">
      </Group>
    </Draggable>
    <!-- <div @click="saveGroup" class="add-group-btn" v-html="getSvg('addGroup')"></div> -->

    <button @click="addGroup" class="add-group-btn">
      <div v-html="getSvg('addGroup')"></div>
      <span>Add new group</span>
    </button>

  </Container>
</template>


