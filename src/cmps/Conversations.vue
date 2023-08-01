<template>
    <section class="modal-content update-modal">

        <h2>Conversations (Task Id: {{ taskId }})</h2>
        <input type="text" class="add-update" placeholder="Write an update..." />
        <ul class="update-list">
            <li v-for="update in updates" class="update-list-item clean-list">
                <ConversationItem :update="update"/>
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
            updates: null
        }
    },
    created() {
        this.updates = this.$store.getters.updates
    },
    methods: {
    },
    watch: {
        taskId: {
            handler() {
                this.$store.commit('loadUpdates', { taskId: this.taskId })
            },
            immediate: true,
        },
    },
    components:{
        ConversationItem
    }
}
</script>