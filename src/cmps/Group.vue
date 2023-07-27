<template>
    <section class="group-list">
        <InPlaceEdit v-model="groupTitle" class="group-header"/>
        <!-- <div v-icon="trash"></div> -->
        <!-- <div className="icon" v-html="getSvg('trash')"></div> -->

        <!-- render group labels by labels array -->

        <section class="label-line">
            <div class="task-column">
                <section class="group-accent-color first" :style="color"></section>
                <button class="button-as-link d-cmp">🚮</button>
                <Checkbox />
                <div class="task-title d-cmp">Task</div>
            </div>
            <Container @drop="onDropLabel($event)" class="labels-grid" orientation="horizontal" behaviour="contain">
                <Draggable v-for="(label, idx) in labels" :key="idx" class="d-cmp header">
                    <div class="d-cmp-label">{{ label }}</div>
                </Draggable>
            </Container>
        </section>


        <!-- render tasks by cmp order -->
        <Container class="tasks-container" :get-child-payload="getTaskChildPayload" group-name="1"
            @drop="onDropTask(idx, $event)">
            <Draggable v-for="(task, idx) in group.tasks" :key="task._id">
                <section class="task">
                    <div class="task-column">
                        <section class="group-accent-color" :style="color"></section>
                        <button @click="onRemoveTask(task._id)" class="d-cmp button-as-link task-trash">🚮</button>
                        <Checkbox class="" />
                        <TaskTitle class="" @update="onUpdateTask('title',task._id, $event)" :info="task.title" />
                    </div>
                    <section v-for="(cmp, idx) in cmpOrder" :key="idx" class="d-cmp">
                        <component :is="cmp" :info="task[cmp]" @update="onUpdateTask(cmp,task._id,$event)">
                        </component>
                    </section>

                </section>
            </Draggable>
            <section class="task new-task">
                <div class="task-column">
                    <section class="group-accent-color last" :style="color"></section>
                    <button class="d-cmp button-as-link task-trash">🚮</button>
                    <Checkbox />
                    <InPlaceEdit v-model="addTaskTxt" class="flex align-center justify-center"></InPlaceEdit>
                </div>
            </section>
            <section class="progress-bar">

            </section>
        </Container>
        <!-- render progress by progress array -->
        <!-- <section class="progress-grid">
            <div v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
        </section> -->
    </section>
</template>

<!-- <Container >
    <Draggable class="grp-scroll" v-for="group in groups" :key="group">
      <Group :group="group"></Group>
    </Draggable>
  </Container>
   -->
<script>
import { Container, Draggable } from "vue3-smooth-dnd"
import TaskTitle from "@/cmps/dynamicCmps/TaskTitle.vue";
import Checkbox from "@/cmps/dynamicCmps/Checkbox.vue";
import Members from "@/cmps/dynamicCmps/Members.vue";
import Date from "@/cmps/dynamicCmps/Date.vue";
import Status from "@/cmps/dynamicCmps/Status.vue";
import Priority from "@/cmps/dynamicCmps/Priority.vue";
import Text from "@/cmps/dynamicCmps/Text.vue";
import Timeline from "@/cmps/dynamicCmps/Timeline.vue";
import Number from "@/cmps/dynamicCmps/Number.vue";
import Attachments from "@/cmps/dynamicCmps/Attachments.vue";
import InPlaceEdit from "@/cmps/InPlaceEdit.vue";
export default {

    props: ['group', 'idx'],
    created() {

    },

    data() {
        return {
            addTaskTxt: 'Add Task',
            groupTitle: this.group.title
        }
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },
        cmpOrder() {
            return this.$store.getters.cmpOrder
        },
        color(){
            console.log(this.group.color)
            return {background:  this.group.color}
        }
    },
    methods: {
        onDropTask(idx, dropResult) {
            this.$store.dispatch({ type: 'applyDragTask', idx, dragResult: dropResult })
        },
        onDropCmp(dropResult) {
            this.$store.dispatch({ type: 'applyDragCmp', dragResult: dropResult })

        },
        onDropLabel(dropResult) {
            this.$store.dispatch({ type: 'applyDragHeader', dragResult: dropResult })
        },
        getTaskChildPayload(index) {
            return this.group.tasks[index]
        },
        onUpdateTask(prop,taskId,toUpdate) {
         
            this.$emit('update',{taskId,prop,toUpdate})
        },
        onRemoveTask(taskId) {
            this.$emit('removeTask', taskId)

        }
        
    },
    components: {
        Checkbox,
        TaskTitle,
        Members,
        Date,
        Status,
        Priority,
        Attachments,
        Number,
        Text,
        Timeline,
        InPlaceEdit,
        Container,
        Draggable
    },
    watch: {
        groupTitle() {
            const prop = 'title'
            const toUpdate = this.groupTitle
            this.$emit('update', {prop,toUpdate})

        },
        addTaskTxt() {
            this.$emit('addTask', this.addTaskTxt)

        }
    }
};
</script>
