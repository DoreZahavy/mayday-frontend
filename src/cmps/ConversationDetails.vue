<template>
    <article class="conversation-item">
        <header>
            <MemberPreview :member="update.user" />
            <h2>{{ this.update.user.fullname }}</h2>
            <div>
                <span>{{ getTimePassed(update.date) }}</span>
                <button @click="onRemoveUpdate" class="button-as-link" v-html="getSvg('trash')"></button>
            </div>
        </header>
        <section>
            <p ref="updateContent">
            </p>
        </section>
    </article>
</template>
<script>
import MemberPreview from "@/cmps/MemberPreview.vue"
import { svgService } from "@/services/svg.service"
export default {
    props: { update: Object },
    components: {
        MemberPreview
    },
    computed: {
        name() {
            let name = this.update.user.fullname
            name = name.split(' ')
            return name[0] + " " + name[1][0]
        }
    },
    mounted() {
        // console.log(this.$refs.updateContent)
        this.$refs.updateContent.innerHTML = this.update.content
    },
    methods: {
        onRemoveUpdate() {
            this.$emit('removeUpdate', this.update._id)
        },
        getTimePassed(timestamp) {
            const now = Date.now()
            const difference = now - timestamp
            const seconds = difference / 1000
            const minutes = seconds / 60
            const hours = minutes / 60
            const days = hours / 24

            if (seconds < 60) return 'now'
            if (minutes < 60) return `${Math.floor(minutes)}m`
            if (hours < 24) return `${Math.floor(hours)}h`
            return `${Math.floor(days)}d`
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>