<template>
    <div class="checkbox-modal">
        <pre>
            {{ checkedTasks }}
        </pre>
    </div>
</template>
<script>
export default {
    props: {
        checkedTasks: Array
    },
    created() {

    }
}
</script>