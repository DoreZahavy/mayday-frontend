<template>
    <section class="modal-content update-modal">

        <h2>Conversations (Task Id: {{ taskId }})</h2>
        <input type="text" v-if="!editing" @focus="this.editing = true">
        <div class="quill-container" v-else>
            <QuillEditor @blur="this.editing = false" v-model="this.content"/>
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
    data() {
        return {
            updates: null,
            editing: false,
            content:''
        }
    },
    created() {
        this.updates = this.$store.getters.updates
    },
    methods: {
        addUpdate(){
            console.log(this.content)
        }
    },
    computed:{
        updates(){
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
    },
    components: {
        ConversationItem
    }
}
</script>