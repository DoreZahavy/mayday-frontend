<template>
    <section>
        <article class="minimized-group">
            <div class="preview">
                <div class="group-header" @click="openEditGroup" v-out="closeEditGroup">
                <div class="group-actions-container">
                    <button @click="onRemoveGroup" v-html="getSvg('trash')"
                        class="button-as-link d-cmp group-actions"></button>
                </div>
                <div v-if="editGroup" @click="openPicker" :style="color" class="color-btn">
                    <ColorPicker v-out="closePicker" v-if="showPicker" @color="onSetColor" />
                </div>
                <!-- <input type="text" v-model="groupTitle" class="editable-group-title" :style="textColor"> -->
                <InPlaceEdit v-model="groupTitle" class="editable-group-title" :style="textColor"></InPlaceEdit>
                <p class="task-count" v-if="!editGroup">{{ taskCount }} Tasks</p>
            </div>
                <button @click="this.$emit('expand', groupIdx)">expand</button>
                <span :style="textColor">{{ group.title }}</span>
            </div>
            <div class="columns">
                <div class="label-line">
                    <div v-for="(label, idx) in labels" :key="idx" class="d-cmp header">
                        {{ label }}
                    </div>
                </div>
                <ProgressBar :cmpOrder="cmpOrder" :group="group" class="progress-bar" />
            </div>
        </article>
    </section>
</template>
<script>
import ProgressBar from '@/cmps/ProgressBar.vue';
import { svgService } from '../services/svg.service'
export default {
    props: ['group', 'groupIdx'],
    computed: {
        labels() {
            return this.$store.getters.labels
        },
        cmpOrder() {
            return this.$store.getters.cmpOrder
        },
        textColor() {
            return { color: this.group.color }
        }
    },
    methods:{
        getSvg(iconName) {
            console.log("🚀 ~ file: MinimizedGroup.vue:38 ~ getSvg ~ iconName:", iconName)
            return svgService.getSvg(iconName)
        },
        openPicker() {
            this.showPicker = true
        },
        closePicker() {
            this.showPicker = false
        },
        openEditGroup() {
            this.editGroup = true
        },
        closeEditGroup() {
            this.editGroup = false
        }
    },
    components: {
        ProgressBar
    }
}
</script>