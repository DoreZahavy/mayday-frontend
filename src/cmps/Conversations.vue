<template>
    <section class="modal-content update-modal">
     
        <h2>Conversations (Task Id: {{ taskId }})</h2>
        <input type="text" class="add-update" placeholder="Write an update..."/>
        <ul class="update-list">
            <li v-for="update in updates" class="update-item">
            <pre>{{ update }}</pre>
            </li>
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
            // updates: []
        }
    },
    created() {
        console.log('this.taskId:', this.taskId)
        console.log('updates:', this.updates)
    },
    methods: {
    },
    computed:{
        updates(){
            return this.$store.getters.updates
        }
    },
    watch: {
        taskId: {
            handler() {
                this.$store.commit('loadUpdates', this.taskId)
            },
            immediate: true,
        },
    },
}
</script>