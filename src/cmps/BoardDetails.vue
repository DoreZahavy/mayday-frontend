<script>
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import Group from '@/cmps/Group.vue'
import MinimizedGroup from "@/cmps/MinimizedGroup.vue";
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import { svgService } from '../services/svg.service'

export default {
  emits:['openConversations'],
  data() {
    return {
      // collapse: true
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    groups() {
      return this.$store.getters.groups
    },
    collapseAll() {
      return this.collapse
    }
  },
  components: {
    Group,
    MinimizedGroup,
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
    collapseGroups() {
      
      this.board.groups.forEach(group => {
        console.log(group.title)
        // updateBoard(group._id, { prop: true, toUpdate: 'minimized' })
      });
    },
    expandGroups() {
      this.collapse = false
    },
    async updateBoard(groupId, { taskId, prop, toUpdate }) {
      try {

        await this.$store.dispatch({ type: 'updateBoard', groupId, taskId, prop, toUpdate })
        // showSuccessMsg('Board updated')

      } catch (err) {
        // showErrorMsg('Failed to update board')

      }
    },
    async addTask(groupId, title) {
      try {
        const board = await this.$store.dispatch({ type: 'addTask', groupId, title })
        console.log('board:', board)
        showSuccessMsg('Task added')

      } catch (err) {
        showErrorMsg('Failed to add task')

      }
    },
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch({ type: 'removeGroup', groupId })
        showSuccessMsg('Group deleted')
      } catch (err) {
        showErrorMsg('Failed to delete group')
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
    openConversations(taskId) {
      console.log(taskId)
      this.$emit('openConversations', taskId)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }

  }
}
</script>

<template class="flex">
  <Container :drag-begin-delay="200" @drop="onDropGrp" class="board-details" v-if="board">

    <Draggable class="grp-scroll" v-for="(group, idx) in board.groups" :key="group._id">
      <MinimizedGroup :group="group" :groupIdx="idx" @update="updateBoard(group._id, $event)"
        @removeGroup="removeGroup(group._id)" v-if="group.minimized === true">

      </MinimizedGroup>
      <div class="flex" v-else>

        <div class="group-gap"></div>
        <Group :group="group" :idx="idx" class="group" @addTask="addTask(group._id, $event)"
          @removeTask="removeTask(group._id, $event)" @openConversations="$emit('openConversations', $event)"
          @update="updateBoard(group._id, $event)" @removeGroup="removeGroup(group._id)">
        </Group>
      </div>

    </Draggable>
    <button @click="addGroup" class="add-group-btn">
      <div v-html="getSvg('addGroup')"></div>
      <span>Add new group</span>
    </button>


  </Container>
</template>


