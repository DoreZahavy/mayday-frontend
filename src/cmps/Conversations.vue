<template>
    <section class="modal-content update-modal">

        <!-- <input type="text" v-if="!editing" @focus="this.editing = true"> -->
        <div class="quill-container">
            <QuillEditor theme="snow" toolbar="full" v-model="content" @update:content="content" ref="quillEditor">
            </QuillEditor>
            <button @click="addUpdate">Update</button>
        </div>
        <ul class="update-list">
            <li v-for="update in updates" class="update-list-item clean-list">
                <ConversationItem :update="update" />
            </li>
        </ul>
    </section>
</template>

<script>
import ConversationItem from '@/cmps/ConversationItem.vue'
export default {
    props: {
        taskId: String
    },
    components: {
        ConversationItem,
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
            const updatedUpdates = JSON.parse(JSON.stringify(this.updates))
            updatedUpdates.unshift(quillContents)
            // this.$store.dispatch('updateBoard', { groupId: this.groupId, taskId: this.taskId, prop: 'updates', toUpdate: updatedUpdates })
        }
    },
    computed: {
        groupId() {
            const groups = JSON.parse(JSON.stringify(this.$store.getters.groups))
            let groupId
            groups.forEach(g => {
                g.tasks.find(task => {
                    task._id.localeCompare(this.taskId) === 0
                    if (task) groupId = g._id
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