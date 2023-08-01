<template>
    <button v-if="taskConversationsAmount" v-html="getSvg('hasMessage')" class="button-as-link has-msgs"
        @click="onOpenConversations">
    </button>
    <button v-else v-html="getSvg('addMessage')" class="button-as-link" @click="onOpenConversations">
    </button>
    <span v-if="taskConversationsAmount" class="msg-count" @click="onOpenConversations"> {{
        taskConversationsAmount }}</span>
</template>
<script>
import { svgService } from '@/services/svg.service'
export default {
    emits:['openConversations'],
    props: {
        taskId: String,
        taskConversationsAmount: Number
    },
    created() {
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        onOpenConversations() {
            this.$emit('openConversations', this.taskId)
        }
    }
}
</script>