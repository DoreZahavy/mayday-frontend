<template>
    <section class="modal-content update-modal">

        <!-- <input type="text" v-if="!editing" @focus="this.editing = true"> -->
        <div class="quill-container">
            <QuillEditor theme="snow" toolbar="minimal" v-model="content" @update:content="content"  ref="quillEditor"></QuillEditor>
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
            const quill = this.$refs.quillEditor.getContents();
            console.log(quill)
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