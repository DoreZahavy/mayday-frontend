<template>
    <section class="group-list">
        <InPlaceEdit v-model="groupTitle" />
        <!-- <div v-icon="trash"></div> -->
        <!-- <div className="icon" v-html="getSvg('trash')"></div> -->

        <!-- render group labels by labels array -->

        <article class="group-accent-color first"></article>
        <section class="label-line">
            <div class="task-column">
                <button class="button-as-link d-cmp">🚮</button>
                <Checkbox />
                <div class="task-title d-cmp">task</div>
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
                    <!-- <article class="group-accent-color last" v-if="idx >= group.tasks.length-1"></article> -->
                    <article class="group-accent-color"></article>
                    <div class="task-column">
                        <button @click="onRemoveTask(task._id)" class="d-cmp button-as-link task-trash">🚮</button>
                        <Checkbox class="" />
                        <TaskTitle class="" @update="onUpdateTask(task._id, $event)" :info="task.title" />
                    </div>
                    <section v-for="(cmp, idx) in cmpOrder" :key="idx" class="d-cmp">
                        <component :is="cmp" :info="task.components[cmp]" @update="onUpdateTask(task._id, $event)">
                        </component>
                    </section>

                </section>
            </Draggable>
            <article class="group-accent-color last"></article>
            <section class="task new-task">
                <button class="d-cmp button-as-link task-trash">🚮</button>
                <Checkbox />
                <InPlaceEdit v-model="addTaskTxt"></InPlaceEdit>
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
import Person from "@/cmps/dynamicCmps/Person.vue";
import Date from "@/cmps/dynamicCmps/Date.vue";
import Status from "@/cmps/dynamicCmps/Status.vue";
import Priority from "@/cmps/dynamicCmps/Priority.vue";
import Txt from "@/cmps/dynamicCmps/Txt.vue";
import Timeline from "@/cmps/dynamicCmps/Timeline.vue";
import Numbers from "@/cmps/dynamicCmps/Numbers.vue";
import Files from "@/cmps/dynamicCmps/Files.vue";
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
            console.log('res', dropResult)
            this.$store.dispatch({ type: 'applyDragHeader', dragResult: dropResult })
        },
        getTaskChildPayload(index) {
            return this.group.tasks[index]
        },
        onUpdateTask(taskId, taskData) {
            taskData._id = taskId
            console.log(taskData)
            this.$emit('saveTask', taskData)
        },
        onRemoveTask(taskId) {
            this.$emit('removeTask', taskId)

        }
    },
    components: {
        Checkbox,
        TaskTitle,
        Person,
        Date,
        Status,
        Priority,
        Files,
        Numbers,
        Txt,
        Timeline,
        InPlaceEdit,
        Container,
        Draggable
    },
    watch: {
        groupTitle() {
            this.$emit('saveGroup', this.groupTitle)

        },
        addTaskTxt() {
            this.$emit('saveTask', this.addTaskTxt)

        }
    }
};
</script>

<style lang="scss">
// .task {
//     border-left: 1px solid black;
//     // position: relative;
//     background: white;
//     display: grid;
//     grid-template-columns: $row-height $row-height 300px repeat(4, 150px);
//     height: $row-height;
//     align-items: center;

//     // grid-template-columns: 6.6% 200px 1fr 1fr 1fr 1fr;

//     /* justify-content: center; */
//     &:hover {
//         background-color: $task-hover;
//     }
// }

// .d-cmp,
// .d-cmp-label {

//     // border: 1px solid black;

//     // &:nth-child(1) {
//     //     position: sticky;
//     //     z-index: 10;
//     //     width: var(--row-height);
//     //     left: 0;
//     // }

//     // &:nth-child(2) {
//     //     position: sticky;
//     //     z-index: 10;
//     //     margin-left: -80px;
//     //     left: var(--row-height);
//     // }

//     // &:nth-child(5) {
//     //     margin-left: -165px;
//     // }
// }


// .labels-grid,
// .progress-grid {
//     // width: 100%;
//     background: rgba(197, 188, 188, 0.59);
//     display: grid;
//     // grid-template-columns: 33px 308px repeat(4, 150px);
//     // grid-template-columns: var(--row-height) 300px repeat(4, 150px);

//     /* grid-template-columns: 2% 2fr 1fr 1fr 1fr 1fr; */
//     /* justify-content: center; */
// }

// .label-line{
//     display: grid;
//     grid-template-columns: $row-height $row-height 300px repeat(4, 150px);

// }
// .group-list {
//     margin-top: 2em;



// }
</style>