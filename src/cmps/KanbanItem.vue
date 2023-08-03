<template>
  <Draggable v-if="task">
    <div class="kanban-task">

      <p class="task-title">{{ task.title }}</p>
      <section class="flex align-center space-between cmp-area">
        <div class="cmp-title">Person</div>
        <div class="kanban-cmp">

          <Members class="kanban-cmp" :info="task['Members']" />
        </div>
      </section>

      <!-- <section v-for="(cmp, idx) in cmpOrder" :key="idx" class="d-cmp"> -->
      <!-- <component :is="cmp" :info="task[cmp+'Kanban']" @update="onUpdateTask(cmp, task._id, $event)">
        </component> -->
      <!-- </section> -->

    </div>
  </Draggable>
</template>
  
<script>
import { Draggable } from 'vue3-smooth-dnd'
import MembersKanban from "@/cmps/kanbanCmps/MembersKanban.vue"
import Members from "@/cmps/dynamicCmps/Members.vue"
import Date from "@/cmps/dynamicCmps/Date.vue"
import Status from "@/cmps/dynamicCmps/Status.vue"
import Priority from "@/cmps/dynamicCmps/Priority.vue"
import Text from "@/cmps/dynamicCmps/Text.vue"
import Timeline from "@/cmps/dynamicCmps/Timeline.vue"
import Number from "@/cmps/dynamicCmps/Number.vue"
import Attachments from "@/cmps/dynamicCmps/Attachments.vue"
export default {
  name: "KanbanItem",
  components: {
    Draggable,

    MembersKanban,
    Members,
    Date,
    Status,
    Priority,
    Attachments,
    Number,
    Text,
    Timeline,
  },
  data() {
    return {
      //  cmpOrder:['Members','Date','Timeline','Number']
      cmpOrder: ['MembersKanban']
    }
  },
  props: {
    task: Object,
  },
  computed: {
    // cmpOrder() {
    //   return this.$store.getters.cmpOrder
    // },
  }
}
</script >

<style scoped lang="scss">
.task-title{
  margin-block-end: 8px;
}
.cmp-area {
  margin-block-end: 8px;
  .cmp-title {
    width: 76px;
    height: 34px;
    background-color: aqua;
  }

  .kanban-cmp {
    width: 140px;
    height: 36px;
    background-color: blueviolet;
   
  }
}

</style>