<template>
    <Container class="h-full flex overflow-x-auto gap-8  p-8" group-name="cols" tag="div" orientation="horizontal"
        @drop="onColumnDrop($event)">
        <Draggable class="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
            v-for="column in scene" :key="column.id">
            <div class="h-full flex flex-col">

                <!-- header-->
                <div class="cursor-move rounded-t-lg p-4 space-x-4 bg-primary text-white flex space-x-2">
                    <HandIcon class="h-6 w-6"></HandIcon>
                    <span class="text-lg">{{ column.title }}</span>
                </div>
                <!-- column -->
                <Container class="flex-grow overflow-y-auto overflow-x-hidden" group-name="col-items"
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
                    <KanbanItem v-for="item in column.children" :key="item.id" :item="item"></KanbanItem>
                </Container>
            </div>
        </Draggable>
    </Container>
</template>
  
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'




export default {
    components: { Container, Draggable },
    data() {
        return {
            colOrder:['Done','Blank','Almost there','Working on it','Stuck']
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
            const scene = Object.assign({}, this.scene)
            scene.children = applyDrag(scene.children, dropResult)
            this.scene = scene
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

                newColumn.children = applyDrag(newColumn.children, dropResult)
                scene.children.splice(itemIndex, 1, newColumn)
                this.scene = scene
            }
        },
        getCardPayload(columnId) {
            return index => {
                return this.scene.children.filter(p => p.id === columnId)[0].children[index]
            }
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
            const board = this.$store.getters.board
            var scene = [{title:'',tasks:[]}, {title:'',tasks:[]},{ title:'',tasks:[]},{ title:'',tasks:[]},{ title:'',tasks:[]}]
            // var scene = []
            for (var i = 0; i < this.colOrder.length; i++) {
                scene[i].title = this.colOrder[i]
            }
            board.groups.forEach(group => {
                group.task.forEach(task => {
                    task.groupId = group._id
                    var idx = this.colOrder.indexOf(task.Status.title)
                    if(idx===-1) idx =this.colOrder.indexOf('Blank')
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