<template>
    <Container class="kanban-container flex" group-name="cols" tag="div" orientation="horizontal"
        @drop="onColumnDrop($event)">
        <Draggable class="kanban-column " v-for="(column, idx) in scene" :key="column.idx">
            <div class=" flex flex-column ">

                <!-- header-->
                <div class="column-header flex" :style="headerColor(column.title)">
                    <span class="column-title">{{ column.title + ' / ' + column.tasks.length }}</span>
                </div>
                <!-- column -->
                <Container class="flex flex-column column-body " group-name="col-items"
                    :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                    :get-child-payload="getCardPayload(column.id)" :drop-placeholder="{
                        className:
                            `bg-primary bg-opacity-20  
              border-dotted border-2 
              border-primary rounded-lg mx-4 my-2`,
                        animationDuration: '200',
                        showOnTop: true
                    }" drag-class="bg-primary dark:bg-primary 
              border-2 border-primary-hover text-white 
              transition duration-100 ease-in z-50
              transform rotate-6 scale-110" drop-class="transition duration-100 
              ease-in z-50 transform 
              -rotate-2 scale-90" @drop="(e) => onCardDrop(column.id, e)">

                    <!-- Items -->
                    <KanbanItem v-for="task in column.tasks" :key="task._id" :task="task"></KanbanItem>
                </Container>
            </div>
        </Draggable>
    </Container>
</template>
  
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanItem from '@/cmps/KanbanItem.vue'



export default {
    components: {


        Container,
        Draggable,

        KanbanItem
    },
    data() {
        return {
            colOrder: ['Done', 'Blank', 'Almost there', 'Working on it', 'Stuck']
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
            this.colOrder = this.applyDrag(this.colOrder, dropResult)
            // this.scene = scene
        },
        onCardDrop(columnId, dropResult) {

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
        getCardPayload(columnId) {
            return index => {
                return this.scene.children.filter(p => p.id === columnId)[0].children[index]
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
        },
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
            for (var i = 0; i < this.colOrder.length; i++) {
                scene[i].title = this.colOrder[i]
            }
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.groupId = group._id
                    var idx = this.colOrder.indexOf(task.Status.title)
                    if (idx === -1) idx = this.colOrder.indexOf('Blank')
                    scene[idx].tasks.push(task)
                })
            })
            return scene

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