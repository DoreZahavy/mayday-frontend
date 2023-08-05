<template>
  <Draggable v-if="task">
    <div class="kanban-task">
      <div v-if="task.Attachments.length>0" class="kanban-task-img">

        <img   :src="task.Attachments[0]"/>
      </div>
      <p class="task-title">{{ task.title }}</p>
      <section class="flex align-center space-between cmp-area" v-if="cmps.includes('Members')">
        <div class="cmp-title">
          <span class="cmp-svg" v-icon="'personSmall'"></span>
          <p>Person</p>
        </div>
        <div class="kanban-cmp">

          <Members class="kanban-cmp" :info="task['Members']" />
        </div>
      </section>
      <section class="flex align-center space-between cmp-area" v-if="cmps.includes('Date')">
        <div class="cmp-title">
          <span class="date-svg" v-icon="'datePicker'"></span>
          <p>Date</p>
        </div>
        <div class="kanban-cmp">

          <Date class="kanban-cmp" :info="task['Date']" />
        </div>
      </section>
      <section class="flex align-center space-between cmp-area" v-if="cmps.includes('Number')">
        <div class="cmp-title">
          <span class="nums-svg" v-icon="'nums'"></span>
          <p>Numbers</p>
        </div>
        <div class="kanban-cmp">

          <Number class="kanban-cmp" :info="task['Number']" />
        </div>
      </section>
      <section class="flex align-center space-between cmp-area" v-if="cmps.includes('Timeline')">
        <div class="cmp-title">
          <span class="timeline-svg" v-icon="'timelineActivity'"></span>
          <p>Timeline</p>
        </div>
        <div class="kanban-cmp">

          <Timeline class="kanban-cmp" :groupColor="color.backgroundColor" :info="task['Timeline']" />
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
    color:Object,
    cmps:Array
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
    display: flex;
    align-items: center;
    width: 76px;
    height: 34px;
    // background-color: aqua;
    .date-svg{
      scale: 0.75;
      transform: translate(-4px);
    }
    .nums-svg{
      scale: 0.8;
      transform: translate(-4px);
    }
    .timeline-svg{
      scale: 0.75;
      transform: translate(-4px);
    }
    .cmp-svg{
     margin-inline-end: 4px;
     color: #676879;
    //  font-size: 14px;
    //  scale: 0.75;
  
    }
  }

  .kanban-cmp {
    width: 140px;
    height: 36px;
    background-color: #f5f6f8;
   
  }
}

</style>