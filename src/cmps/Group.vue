<template>
    <section class="group-list">
        <!-- render group labels by labels array -->

        <Container drag-handle-selector=".d-cmp-label" @drop="onDropLabel($event)" class="labels-grid"
            orientation="horizontal" behaviour="contain">
            <section class="label-line">
                <button>Trash</button>
                <Checkbox />
                <div class="task-title">task</div>
                <Draggable v-for="(label, idx) in labels" :key="idx" class="d-cmp-label">
                    <div class="d-cmp-label">{{ label }}</div>
                </Draggable>
            </section>
        </Container>

        <!-- render tasks by cmp order -->
        <Container :get-child-payload="getTaskChildPayload" group-name="1" @drop="onDropTask(idx, $event)">
            <Draggable v-for="task in group.tasks" :key="task.id">
                <section class="task">
                    <button>Trash</button>
                    <Checkbox />
                    <TasktTitle :info="task.tasktTitle" />
                    <section v-for="(cmp, idx) in cmpOrder" :key="idx" class="d-cmp">
                        <component :is="cmp" :info="task[cmp]"></component>
                    </section>

                </section>
            </Draggable>
            <p>ADD TASK</p>
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
import TasktTitle from "@/cmps/dynamicCmps/TaskTitle.vue";
import Checkbox from "@/cmps/dynamicCmps/Checkbox.vue";
import Person from "@/cmps/dynamicCmps/Person.vue";
import Date from "@/cmps/dynamicCmps/Date.vue";
import Status from "@/cmps/dynamicCmps/Status.vue";
import Priority from "@/cmps/dynamicCmps/Priority.vue";
export default {

    props: ['group', 'idx'],
    created() {
    },

    data() {
        return {
        };
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
            this.$store.commit({ type: 'applyDragTask', idx, dragResult: dropResult })
        },
        onDropCmp(dropResult) {
            this.$store.commit({ type: 'applyDragCmp', dragResult: dropResult })

        },
        onDropLabel(dropResult) {
            this.$store.commit({ type: 'applyDragHeader', dragResult: dropResult })
        },
        getTaskChildPayload(index) {
            return this.group.tasks[index]
        }
    },
    components: {
        Checkbox,
        TasktTitle,
        Person,
        Date,
        Status,
        Priority,
        Container, Draggable
    },
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