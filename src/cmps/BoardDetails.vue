<script>
import { boardService } from "@/services/board.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import Group from '@/cmps/Group.vue'
import MinimizedGroup from "@/cmps/MinimizedGroup.vue"
import InPlaceEdit from '@/cmps/InPlaceEdit.vue'
import CheckboxModal from '@/cmps/CheckboxModal.vue'
import { Container, Draggable } from "vue3-smooth-dnd"
import { svgService } from '../services/svg.service'

export default {
  emits: ['openConversations'],
  data() {
    return {
      // collapse: true
      checkedTasksGroups: [],
      // toggleSelectAll: false
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.board
    },
    filteredBoard() {
      return this.$store.getters.filteredBoard
    },
    groups() {
      return this.$store.getters.groups
    },
    collapseAll() {
      return this.collapse
    },
    board() {
      if (this.filteredBoard) return this.filteredBoard
      return this.currBoard
    }
  },
  components: {
    Group,
    MinimizedGroup,
    InPlaceEdit,
    Container,
    Draggable,
    CheckboxModal
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
      })
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
    async batchRemoveTasks(checkedTasksGroups) {
      console.log("🚀 ~ file: BoardDetails.vue:107 ~ batchRemoveTasks ~ checkedTasksGroups:", checkedTasksGroups)
      try {
        checkedTasksGroups.forEach(group => {
          group.taskIds.forEach(tId => {
            try {
              this.removeTask(group.groupId, tId)
            }
            catch (err) {
              console.log('canny do it')
            }
          })
        })
      } catch (err) {

      }
    },
    openConversations(taskId) {
      console.log(taskId)
      this.$emit('openConversations', taskId)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    onCheckedTasksChanged(tasks) {
      const idx = this.checkedTasksGroups.findIndex(g => g.groupId === tasks.groupId)
      if (idx === -1) this.checkedTasksGroups.push(tasks)
      else this.checkedTasksGroups[idx].tasks = tasks
      const removeIdx = this.checkedTasksGroups.findIndex(g => g.taskIds.length === 0)
      if (removeIdx !== -1) this.checkedTasksGroups.splice(removeIdx, 1)
    },
    uncheckAll() {
      this.checkedTasksGroups.forEach(group => {
        group.taskIds = []
      })
      this.checkedTasksGroups = []
    }
  }
}
</script>
<!-- && Object.keys(filteredBoard).length === 0 -->
<template class="flex">
  <Container v-if="board" @drop="onDropGrp" class="board-details">

    <Draggable class="grp-scroll" v-for="(group, idx) in board.groups" :key="group._id">
      <MinimizedGroup :group="group" :groupIdx="idx" @update="updateBoard(group._id, $event)"
        @removeGroup="removeGroup(group._id)" v-if="group.minimized === true">

      </MinimizedGroup>
      <div class="flex" v-else>

        <div class="group-gap"></div>
        <Group :group="group" :idx="idx" :checkedTasksGroups="checkedTasksGroups" class="group"
          @addTask="addTask(group._id, $event)" @removeTask="removeTask(group._id, $event)"
          @openConversations="$emit('openConversations', $event)" @update="updateBoard(group._id, $event)"
          @removeGroup="removeGroup(group._id)" @checkedTasksChanged="onCheckedTasksChanged">
        </Group>
      </div>
    </Draggable>
    <button @click="addGroup" class="add-group-btn">
      <div v-html="getSvg('addGroup')"></div>
      <span>Add new group</span>
    </button>


    <CheckboxModal v-if="this.checkedTasksGroups.length !== 0" :checkedTasksGroups="this.checkedTasksGroups"
      @uncheckAll="uncheckAll" @removeTasks="batchRemoveTasks" />
  </Container>

  <!-- <Container v-if="board" @drop="onDropGrp" class="board-details">

    <Draggable class="grp-scroll" v-for="(group, idx) in filteredBoard.groups" :key="group._id">
      <MinimizedGroup :group="group" :groupIdx="idx" @update="updateBoard(group._id, $event)"
        @removeGroup="removeGroup(group._id)" v-if="group.minimized === true">

      </MinimizedGroup>
      <div class="flex" v-else>

        <div class="group-gap"></div>
        <Group :group="group" :idx="idx" class="group" @addTask="addTask(group._id, $event)"
          @removeTask="removeTask(group._id, $event)" @openConversations="$emit('openConversations', $event)"
          @update="updateBoard(group._id, $event)" @removeGroup="removeGroup(group._id)"
          @checkedTasksChanged="onCheckedTasksChanged" :toggleSelectAll="toggleSelectAll">
        </Group>
      </div>

    </Draggable>
    <button @click="addGroup" class="add-group-btn">
      <div v-html="getSvg('addGroup')"></div>
      <span>Add new group</span>
    </button>


    <CheckboxModal v-if="this.checkedTasksGroups.length !== 0" :checkedTasksGroups="this.checkedTasksGroups"
      @uncheckAll="uncheckAll" @removeTasks="batchRemoveTasks" />
  </Container> -->
</template>


