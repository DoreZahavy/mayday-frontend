<template>
    <section class="modal-content update-modal">

        <h2>Conversations (Task Id: {{ taskId }})</h2>
        <input type="text" 1v-if="!editing" @focus="this.editing = true">
        <div class="quill-container" 1v-else>
            <!-- <QuillEditor theme="snow" toolbar="full"/> -->
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
// import { QuillEditor } from 'vue-quill-editor'
export default {
    props: {
        taskId: String
    },
    components: {
        ConversationItem,
        // QuillEditor
    },
    data() {
        return {
            updates: null,
            editing: false,
            content: ''
        }
    },
    created() {
        this.updates = this.$store.getters.updates
    },
    methods: {
        addUpdate() {
            console.log(this.content)
        }
    },
    computed: {
        updates() {
            return this.$store.getters.updates
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