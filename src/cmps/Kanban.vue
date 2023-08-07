<template>
    <main class="kanban-details">
        <section class="kanban-options">
            <StatusProgress v-if="sortBy === 'Status'" :group="concatTasks" />
            <PriorityProgress v-if="sortBy === 'Priority'" :group="concatTasks" />
            <div class="settings-btn" v-icon="'settings'" @click="showKanbanModal = true"
                :class="{ active: showKanbanModal === true }">
            </div>

        </section>

        <Container class="kanban-container flex" group-name="cols" tag="div" orientation="horizontal"
            @drop="onColumnDrop($event)">
            <div v-if="showKanbanModal === true" v-out="closeModal" class="kanban-modal">
                <h3 class="settings-title">Settings</h3>
                <!-- <div class="settings-title flex align-center"> -->
                <!-- <span v-icon="'settings'"></span> -->
                <!-- </div> -->
                <section class="modal-inner-container">
                    <p class="modal-title">Kanban Column</p>
                    <div class="flex align-center sort-option" :class="{ active: sortBy === 'Status' }">
                        <span v-icon="'kanbanSort'"></span>
                        <p @click="sortBy = 'Status'">Status</p>
                    </div>
                    <div class="flex align-center sort-option" :class="{ active: sortBy === 'Priority' }">
                        <span v-icon="'kanbanSort'"></span>
                        <p @click="sortBy = 'Priority'">Priority</p>
                    </div>
                    <!-- <hr /> -->
                    <p class="modal-title">Card Column</p>
                    <div class="flex align-center space-between modal-cmp">
                        <label class="flex align-center" for="members"><span v-icon="'personSmall'"></span>Members</label>
                        <input id="members" type="checkbox" v-model="kanbanCmps" value="Members">
                    </div>
                    <div class="flex align-center space-between modal-cmp">
                        <label class="flex align-center" for="date"><span class="date-svg"
                                v-icon="'datePicker'"></span>Date</label>
                        <input id="date" type="checkbox" v-model="kanbanCmps" value="Date">
                    </div>
                    <div class="flex align-center space-between modal-cmp">
                        <label class="flex align-center" for="numbers"><span class="nums-svg"
                                v-icon="'nums'"></span>Numbers</label>
                        <input id="numbers" type="checkbox" v-model="kanbanCmps" value="Number">
                    </div>
                    <div class="flex align-center space-between modal-cmp">
                        <label class="flex align-center" for="timeline"><span class="timeline-svg"
                                v-icon="'timelineActivity'"></span>Timeline</label>
                        <input id="timeline" type="checkbox" v-model="kanbanCmps" value="Timeline">
                    </div>
                    <!-- <pre>{{ kanbanCmps }}</pre> -->
                </section>
            </div>

            <Draggable class="kanban-column " v-for="( column, idx ) in  scene " :key="column.idx">
                <div class=" flex flex-column column">

                    <!-- header-->
                    <div class="column-header flex" :style="headerColor(column.title)">
                        <span class="column-title">{{ column.title + ' / ' + column.tasks.length }}</span>
                    </div>
                    <!-- column -->
                    <Container class="flex flex-column column-body " group-name="col-items"
                        :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                        :get-child-payload="getCardPayload(column.title)" :drop-placeholder="{
                                className:
                                    `bg-primary bg-opacity-20  
              border-dotted border-2 
              border-primary rounded-lg mx-4 my-2`,
                                animationDuration: '200',
                                showOnTop: true
                            }
                            " drag-class="bg-primary dark:bg-primary 
              border-2 border-primary-hover text-white 
              transition duration-100 ease-in z-50
              transform rotate-6 scale-110" drop-class="transition duration-100 
              ease-in z-50 transform 
              -rotate-2 scale-90" @drop="(e) => onCardDrop(column.id, e)">

                        <!-- Items -->
                        <KanbanItem v-for=" task  in  column.tasks " :key="task._id" :task="task" :cmps="kanbanCmps"
                            :color="headerColor(column.title)"></KanbanItem>
                    </Container>
                </div>
            </Draggable>
        </Container>
    </main>
</template>
  
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanItem from '@/cmps/KanbanItem.vue'
import StatusProgress from '@/cmps/progressCmps/StatusProgress.vue'
import PriorityProgress from '@/cmps/progressCmps/PriorityProgress.vue'



export default {
    components: {
        Container,
        Draggable,
        StatusProgress,
        PriorityProgress,
        KanbanItem
    },
    data() {
        return {
            kanbanCmps: ['Members', 'Date', 'Number','Timeline'],
            sortBy: 'Status',
            colOrder: { Status: ['Done', 'Blank', 'Almost there', 'Working on it', 'Stuck'], Priority: ['Low', 'Blank', 'Medium', 'High', 'Critical ⚠'] },
            showKanbanModal: false
            //    scene : [{title:'blank',Tasks:[]}, {title:'Done',Tasks:[]},{ title:'Working on it',Tasks:[]},{ title:'Stuck',Tasks:[]},{ title:'Almost there',Tasks:[]}]

        }
    },
    mounted() { },
    methods: {
        getColumnHeightPx() {
            let kanban = document.getElementById('kanbanContainer');
            return kanban ? kanban.offsetHeight - 122 : 0;
        },
        onColumnDrop(dropResult) {
            // const scene = Object.assign({}, this.scene)
            this.colOrder[this.sortBy] = this.applyDrag(this.colOrder[this.sortBy], dropResult)
            // this.scene = scene
        },
        onCardDrop(columnId, dropResult) {
            console.log('columnId:', columnId)
            console.log('dropResult:', dropResult)
            // check if element where ADDED or REMOVED in current collumn
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                const scene = Object.assign({}, this.scene)
                const column = scene.children.filter(p => p.id === columnId)[0]
                const itemIndex = scene.children.indexOf(column)
                const newColumn = Object.assign({}, column)

                // check if element was ADDED in current column
                if ((dropResult.removedIndex == null && dropResult.addedIndex >= 0)) {
                    // your action / api call
                    dropResult.payload.loading = true
                    // simulate api call
                    setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
                }

                newColumn.children = this.applyDrag(newColumn.children, dropResult)
                scene.children.splice(itemIndex, 1, newColumn)
                this.scene = scene
            }
        },
        getCardPayload(columnTitle) {
            return index => {
                return this.scene.filter(p => p.title === columnTitle)[0][index]
            }
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;
            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
        headerColor(title) {
            if (title === 'Done') return { backgroundColor: '#00c875' }
            if (title === 'Working on it') return { backgroundColor: '#fdab3d' }
            if (title === 'Blank') return { backgroundColor: '#c4c4c4' }
            if (title === 'Almost there') return { backgroundColor: '#0086c0' }
            if (title === 'Stuck') return { backgroundColor: '#e2445c' }
            if (title === 'Low') return { backgroundColor: '#579bfc' }
            if (title === 'Medium') return { backgroundColor: '#5559df' }
            if (title === 'High') return { backgroundColor: '#401694' }
            if (title === 'Critical ⚠') return { backgroundColor: '#333333' }
        },
        closeModal() {
            this.showKanbanModal = false
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        groups() {
            return this.$store.getters.groups
        },
        scene() {
            const board = JSON.parse(JSON.stringify(this.$store.getters.board))
            var scene = [{ title: '', tasks: [] }, { title: '', tasks: [] }, { title: '', tasks: [] }, { title: '', tasks: [] }, { title: '', tasks: [] }]
            // var scene = []
            for (var i = 0; i < this.colOrder[this.sortBy].length; i++) {
                scene[i].title = this.colOrder[this.sortBy][i]
            }
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.groupId = group._id
                    var idx = this.colOrder[this.sortBy].indexOf(task[this.sortBy].title)
                    if (idx === -1) idx = this.colOrder[this.sortBy].indexOf('Blank')
                    scene[idx].tasks.push(task)
                })
            })
            return scene

        },
        concatTasks() {
            const board = JSON.parse(JSON.stringify(this.$store.getters.board))
            var concatTasks = { tasks: [] }
            board.groups.forEach(group => {
                group.tasks.forEach(task => {

                    concatTasks.tasks.push(task)
                })
            })

            return concatTasks
        }
    },
}
</script>
<style>
/** NB: dont remove, 
  * When using orientation="horizontal" it auto sets "display: table"
  * In this case we need flex and not display table  
  */
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style>