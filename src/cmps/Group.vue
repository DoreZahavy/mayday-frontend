<template>
    <section class="group-list">

        <div class="group-title-container flex align-center">

            <button @click="onCollapse" v-icon="'arrowDown'" class="button-as-link arrow-down" :style="textColor"></button>
            <div class="group-header" @click="openEditGroup" v-out="closeEditGroup">
                <!-- <button @click="onCollapse" v-html="getSvg('arrowDown')" class="button-as-link" :style="textColor"></button> -->
                <div class="group-actions-container">
                    <!-- <button @click="onRemoveGroup" v-icon="'trash'" class="button-as-link d-cmp group-actions"></button> -->
                    <el-popover placement="left-start" :width="265" trigger="click" :show-arrow="false">
                        <button @click="onRemoveGroup" class="remove-update-button button-as-link flex align-center fs14">
                            <i v-html="getSvg('trash')"></i>
                            <span>
                                Delete
                            </span>
                        </button>
                        <template #reference>
                            <div class="button-as-link actions-button d-cmp group-actions" v-html="getSvg('threeDots')">
                            </div>
                        </template>
                    </el-popover>
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
                <Checkbox :groupId="this.group._id" />
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
                                <!-- <button @click="onRemoveTask(task._id)" v-html="getSvg('threeDots')"
                                    class="button-as-link task-trash"></button> -->
                                <el-popover placement="left-start" :width="265" trigger="click" :show-arrow="false">
                                    <button @click="onRemoveTask(task._id)"
                                        class="remove-update-button button-as-link flex align-center fs14">
                                        <i v-html="getSvg('trash')"></i>
                                        <span>
                                            Delete
                                        </span>
                                    </button>
                                    <template #reference>
                                        <div class="button-as-link actions-button" v-html="getSvg('threeDots')"></div>
                                    </template>
                                </el-popover>
                            </div>
                        </div>
                        <section class="group-accent-color" :style="color"></section>
                        <Checkbox :taskId="task._id" @checked="onChecked" @unchecked="onUnchecked" />
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
                    <!-- <input type="text" placeholder="+ Add Task"> -->
                    <AddTask @addTask="setAddTaskTxt" class="add-task" />
                    <!-- <InPlaceEdit v-model="addTaskTxt" class="flex align-center add-task"></InPlaceEdit> -->
                </div>
            </section>
            <section class="progress flex">
                <div class="progress-margin"></div>
                <div class="progress-container flex">
                    <div class="progress-border"></div>
                    <ProgressBar :cmpOrder="cmpOrder" :group="group" />
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
import TaskTitle from "@/cmps/dynamicCmps/TaskTitle.vue"
import Checkbox from "@/cmps/dynamicCmps/Checkbox.vue"
import Members from "@/cmps/dynamicCmps/Members.vue"
import Date from "@/cmps/dynamicCmps/Date.vue"
import Status from "@/cmps/dynamicCmps/Status.vue"
import Priority from "@/cmps/dynamicCmps/Priority.vue"
import Text from "@/cmps/dynamicCmps/Text.vue"
import Timeline from "@/cmps/dynamicCmps/Timeline.vue"
import Number from "@/cmps/dynamicCmps/Number.vue"
import Attachments from "@/cmps/dynamicCmps/Attachments.vue"
import InPlaceEdit from "@/cmps/InPlaceEdit.vue"
import AddTask from '@/cmps/AddTask.vue'
import ColorPicker from "@/cmps/ColorPicker.vue"
import ConversationBtn from '@/cmps/ConversationBtn.vue'
import ProgressBar from '@/cmps/ProgressBar.vue'
export default {
    // emits: ['update'],
    props: ['group', 'idx', 'collapseAll'],
    created() {
    },

    mounted() {
    },

    data() {
        return {
            groupTitle: this.group.title,
            showPicker: false,
            editGroup: false,
            addTaskTxt: '',
            checkedTasks: {
                groupId: this.group._id,
                groupColor: this.group.color,
                taskIds: []
            }
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
        onChecked(taskId) {
            console.log('checked ',taskId)
            this.checkedTasks.taskIds.push(taskId)
        },
        onUnchecked(taskId) {
            console.log('unchecked ',taskId)
            const idx = this.checkedTasks.taskIds.findIndex(tId => tId === taskId)
            this.checkedTasks.taskIds.splice(idx, 1)
        },
        setAddTaskTxt(text) {
            console.log(text)
            this.addTaskTxt = text
        },
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
        },
        onCollapse() {
            this.$emit('update', { prop: 'minimized', toUpdate: true })
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
        ProgressBar,
        AddTask,
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
        collapseAll() {
        },
        checkedTasks: {
            handler() {
                this.$emit('checkedTasksChanged', this.checkedTasks)
            },
            deep: true
        }
    }
}
</script>
