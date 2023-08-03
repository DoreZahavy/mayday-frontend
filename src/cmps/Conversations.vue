<template>
    <section class="modal-content update-modal conversations">
        <!-- <label for="quill" v-if="!editing">
            <input type="text" @focus="this.editing = true" placeholder="Write an update...">
        </label> -->
        <div class="quill-container">
            <QuillEditor theme="snow" toolbar="minimal" v-model="content" @update:content="content" ref="quillEditor"
                class="quill-editor" id="quill" @blur="this.editing = false">
            </QuillEditor>
        </div>
        <button @click="addUpdate" class="blue-button justify-self-end">Update</button>
        <ul class="update-list">
            <li v-for="update in updates" class="update-list-item clean-list">
                <conversationDetails :update="update" @removeUpdate="onRemoveUpdate" />
            </li>
        </ul>
    </section>
</template>

<script>
import conversationDetails from '@/cmps/conversationDetails.vue'
import { utilService } from '@/services/util.service.js'
export default {
    props: {
        taskId: String
    },
    components: {
        conversationDetails,
    },
    data() {
        return {
            updates: null,
            editing: false,
            content: null
        }
    },
    created() {
        this.updates = this.$store.getters.updates
    },
    methods: {
        addUpdate() {
            const quillContents = this.$refs.quillEditor.getHTML()
            const updates = JSON.parse(JSON.stringify(this.updates))
            const update = {
                content: quillContents,
                date: Date.now(),
                _id: utilService.makeId(),
                user: {
                    _id: "Nn3N3mTxUn",
                    fullname: "Yona Stephenson",
                    imgUrl: "https://images.unsplash.com/photo-1535123268188-3276dc455e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdCUyMHBpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                }
            }
            updates.unshift(update)
            this.updates = updates
            this.$store.dispatch('updateBoard', { groupId: this.groupId, taskId: this.taskId, prop: 'updates', toUpdate: updates })
        },
        onRemoveUpdate(updateId) {
            const updates = JSON.parse(JSON.stringify(this.updates))
            console.log("🚀 ~ file: Conversations.vue:61 ~ onRemoveUpdate ~ updates:", updates)
            const idx = updates.findIndex(update => update._id === updateId)
            updates.splice(idx, 1)
            this.updates = updates
            this.$store.dispatch('updateBoard', { groupId: this.groupId, taskId: this.taskId, prop: 'updates', toUpdate: updates })
        }
    },
    computed: {
        groupId() {
            const groups = JSON.parse(JSON.stringify(this.$store.getters.groups))
            let groupId
            groups.forEach(g => {

                g.tasks.forEach(task => {
                    if (task._id.localeCompare(this.taskId) === 0) groupId = g._id
                    // groupId = task._id.localeCompare(this.taskId) === 0 ? g._id : null
                })
            })
            return groupId
        }
    },
    watch: {
        taskId: {
            handler() {
                this.$store.commit('loadUpdates', { taskId: this.taskId })
            },
            immediate: true,
        },
    }
}
</script>