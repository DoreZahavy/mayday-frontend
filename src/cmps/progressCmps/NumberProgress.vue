<template>
    <div class="number-progress-bar fs15">
        {{ totalNumber.toLocaleString() }}
    </div>
    <div>sum</div>
</template>

<script>
export default {
    name: 'NumberProgress',
    props: ['group'],
    computed: {
        totalNumber() {
            let total = 0
            for (let task of this.group.tasks) {
                if (task.Number !== null) {
                    total += task.Number
                }
            }
            return total
        }
    }
}
</script>

<style scoped>
.number-progress-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.05em;
    margin-left: 0.3em;
    height: 67.93%;
    width: 92.8%;
    font-size: 1em;
    color: #323338;
}

div:nth-of-type(2) {
    margin-left: 41%;
    margin-top: -4%;
    font-size: 0.85em;
}
</style>