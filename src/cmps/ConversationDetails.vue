<template>
    <article class="conversation-item">
        <header>
            <MemberPreview :member="update.user" class="member-thumbnail" />
            <h2>{{ this.update.user.fullname }}</h2>
            <div>
                <span>{{ getTimePassed(update.date) }}</span>
                
                <el-popover placement="left-start" :width="200" trigger="hover">

                    <template #reference>
                        <button ref="actionsBtn" class="button-as-link" v-html="getSvg('threeDots')"></button>
                    </template>
                </el-popover>
            </div>
        </header>
        <section>
            <p ref="updateContent">
            </p>
        </section>
        <section class="actions">
            <div @click="onLike" class="button-as-link"><span v-html="getSvg('like')"></span> Like</div>
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