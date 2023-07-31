<template>
    <button v-html="getSvg('addMessage')" class="button-as-link">

    </button>
</template>
<script>
import {svgService} from '@/services/svg.service';
export default {
    props: ["taskId"],
    created() {
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>