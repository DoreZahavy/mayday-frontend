<template>
    <section class="progress-bar">
        <article v-for="(cmp, idx) in cmpOrder">
            <component :is="cmp+'Progress'" :group="group" />


        </article>
    </section>
</template>
<script>
import AttachmentsProgress from './progressCmps/AttachmentsProgress.vue';
import StatusProgress from './progressCmps/StatusProgress.vue';
import DateProgress from './progressCmps/DateProgress.vue';
import NumberProgress from './progressCmps/NumberProgress.vue';
import MembersProgress from './progressCmps/MembersProgress.vue';
import PriorityProgress from './progressCmps/PriorityProgress.vue';
import TextProgress from './progressCmps/TextProgress.vue';
import TimelineProgress from './progressCmps/TimelineProgress.vue';
export default {
    props: {
        group: Object,
        cmpOrder: Array
    },
    components: {
        AttachmentsProgress,
        DateProgress,
        MembersProgress,
        NumberProgress,
        PriorityProgress,
        StatusProgress,
        TextProgress,
        TimelineProgress
    }
}
</script>