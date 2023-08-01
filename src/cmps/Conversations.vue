<template>
    <section class="modal-content update-modal">

        <h2>Conversations (Task Id: {{ taskId }})</h2>
        <input type="text" class="add-update" placeholder="Write an update..." />
        <ul class="update-list">
            <!-- <li v-for="update in updates" class="update-item">
                <pre>{{ update }}</pre>
            </li> -->
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        taskId: String
    },
    data() {
        return {
            updates: this.$store.getters.updates
        }
    },
    created() {
        this.updates = {...this.updates}
        console.log("🚀 ~ file: Conversations.vue:26 ~ created ~ this.updates:", this.updates)
        this.updates.forEach(update => {
            update = {...update}
        });
        console.log(this.updates)
    },
    methods: {
    },
    computed: {
        updates() {
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
}
</script>