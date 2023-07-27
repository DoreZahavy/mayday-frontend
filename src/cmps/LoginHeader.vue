<script>
import { svgService } from '../services/svg.service'

export default {
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>
<template>
    <header class="login-header flex align-center">
        <RouterLink class="flex align-center" to="/">
            <img src="../assets/img/logo.png">
            <span class="login-logo">mayday</span>
        </RouterLink>
    </header>
</template>