<template>
    <section class="modal-content">
        <h2>Conversations (Task Id: {{ taskId }})</h2>
    </section>
</template>

<script>
export default {
    props: {
        taskId: String
    },
    data() {
        return {
            updates: []
        }
    },
    created() {
    },
    methods: {
    },
    computed:{
        updates(){
            this.$store.getters.updates
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