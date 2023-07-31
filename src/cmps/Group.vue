<template>
    <section class="group-list">

        <div class="group-title-container flex align-center">

            <div class="group-header" @click="openEditGroup" v-out="closeEditGroup">
                <div class="group-actions-container">
                    <button @click="onRemoveGroup" v-html="getSvg('trash')"
                        class="button-as-link d-cmp group-actions"></button>
                </div>
                <div v-if="editGroup" @click="openPicker" :style="color" class="color-btn">
                    <ColorPicker v-out="closePicker" v-if="showPicker" @color="onSetColor" />
                </div>
                <!-- <input type="text" v-model="groupTitle" class="editable-group-title" :style="textColor"> -->
                <InPlaceEdit v-model="groupTitle" class="editable-group-title" :style="textColor"></InPlaceEdit>
                <p class="task-count" v-if="!editGroup">{{ taskCount }} Tasks</p>
            </div>
        </div>

        <!-- render group labels by labels array -->

        <section class="label-line" v-if="!collapseAll">
            <div class="task-column first not-hover">
                <div class="label-line-gap"></div>
                <div>
                    <section class="group-accent-color first" :style="color">
                    </section>
                </div>
                <Checkbox :checkBoxId="this.group._id" />
                <div class="task-title d-cmp">Task</div>
            </div>
            <Container @drop="onDropLabel($event)" class="labels-grid" orientation="horizontal" behaviour="contain">
                <Draggable v-for="(label, idx) in labels" :key="idx" class="d-cmp header">
                    <div class="d-cmp-label">{{ label }}</div>
                </Draggable>
            </Container>
        </section>

        <!-- 🚮 -->
        <!-- render tasks by cmp order -->
        <Container class="tasks-container" :get-child-payload="getTaskChildPayload" group-name="1"
            @drop="onDropTask(idx, $event)" v-if="!collapseAll">
            <Draggable v-for="(task, idx) in group.tasks" :key="task._id">
                <section class="task">
                    <div class="task-column">
                        <div class="task-actions-container">
                            <div class="task-actions">
                                <button @click="onRemoveTask(task._id)" v-html="getSvg('trash')"
                                    class="button-as-link task-trash"></button>
                            </div>
                        </div>
                        <section class="group-accent-color" :style="color"></section>
                        <Checkbox :checkBoxId="task._id" />
                        <TaskTitle class="" @update="onUpdateTask('title', task._id, $event)" :info="task.title" />
                        <div class="conversation-cell">
                            <ConversationBtn :taskId="task._id" :taskConversationsAmount="task.updates.length"
                                @openConversations="onOpenConversations(task._id)" />
                        </div>
                    </div>
                    <section v-for="(cmp, idx) in cmpOrder" :key="idx" class="d-cmp">
                        <component :is="cmp" :info="task[cmp]" :groupColor="group.color"
                            @update="onUpdateTask(cmp, task._id, $event)">
                        </component>
                    </section>

                </section>
            </Draggable>
            <section class="task new-task">
                <div class="task-column">
                    <div>
                        <section class="group-accent-color last" :style="color">
                        </section>
                    </div>
                    <Checkbox :checkBoxId="''" style="pointer-events: none;" />
                    <InPlaceEdit v-model="addTaskTxt" class="flex align-center add-task"></InPlaceEdit>
                </div>
            </section>
            <section class="progress flex">
                <div class="progress-margin"></div>
                <div class="progress-container flex">
                    <div class="progress-border"></div>
                    <ProgressBar :cmpOrder="cmpOrder" :group="group"/>
                    
                </div>
            </section>
            <div class="bottom-gap"></div>
        </Container>
        <!-- render progress by progress array -->
    </section>
</template>

<script>
import { eventBusService } from '../services/event-bus.service.js'
import { svgService } from '../services/svg.service'

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
import ColorPicker from "@/cmps/ColorPicker.vue";
import ConversationBtn from '@/cmps/ConversationBtn.vue';
import ProgressBar from '@/cmps/ProgressBar.vue';
export default {

    props: ['group', 'idx', 'collapseAll'],
    created() {

    },

    mounted() {
    },

    data() {
        return {
            addTaskTxt: '+ Add Task',
            groupTitle: this.group.title,
            showPicker: false,
            editGroup: false,
        }
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },
        cmpOrder() {
            return this.$store.getters.cmpOrder
        },
        color() {
            return { background: this.group.color }
        },
        textColor() {
            return { color: this.group.color }
        },
        taskCount() {
            return this.group.tasks.length
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
        onUpdateTask(prop, taskId, toUpdate) {
            this.$emit('update', { taskId, prop, toUpdate })
        },
        onRemoveTask(taskId) {
            this.$emit('removeTask', taskId)

        },
        onRemoveGroup() {
            this.$emit('removeGroup')
        },
        onOpenConversations(taskId) {
            console.log(taskId)
            eventBusService.emit('task-clicked', taskId)
        },
        onSetColor(color) {
            console.log('color:', color)
            this.$emit('update', { prop: 'color', toUpdate: color })
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        openPicker() {
            this.showPicker = true
        },
        closePicker() {
            this.showPicker = false
        },
        openEditGroup() {
            this.editGroup = true
        },
        closeEditGroup() {
            this.editGroup = false
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
        ColorPicker,
        Container,
        Draggable,
        ConversationBtn,
        ProgressBar
    },
    watch: {
        groupTitle() {
            const prop = 'title'
            const toUpdate = this.groupTitle
            this.$emit('update', { prop, toUpdate })

        },
        addTaskTxt() {
            this.$emit('addTask', this.addTaskTxt)

        },
        collapseAll(){
            console.log(this.collapseAll)
        }
    }
};
</script>
