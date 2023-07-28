<template>
    <article class="attachments">
        <span class="icon file-icon" v-html="getSvg('file')"></span>
        <span class="icon plus-icon" v-html="getSvg('addUser')"></span>
    </article>
</template>
  
<script>
import { svgService } from '../../services/svg.service'

export default {

    name: "Attachments",
    props: {
        info: Array,
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>