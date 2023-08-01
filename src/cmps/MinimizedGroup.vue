<template>
    <section class="flex relative">
        <div class="minimized-group-side-div">

        </div>
        <article class="minimized-group">
            <div class="group-color-accent" :style="backgroundColor"></div>
            <div class="preview">
                <div class="group-header" @click="openEditGroup" v-out="closeEditGroup">
                    <div class="group-actions-container">
                        <button @click="onRemoveGroup" v-html="getSvg('trash')"
                            class="button-as-link group-actions"></button>
                    </div>
                    <div v-if="editGroup" @click="openPicker" :style="color" class="color-btn">
                        <ColorPicker v-out="closePicker" v-if="showPicker" @color="onSetColor" />
                    </div>
                    <input type="text" v-model="groupTitle" class="editable-group-title" :style="textColor">
                    <InPlaceEdit v-model="groupTitle" class="editable-group-title" :style="textColor"></InPlaceEdit>
                    <p class="task-count" v-if="!editGroup">{{ taskCount }} Tasks</p>
                    <button @click="onExpand" v-html="getSvg('arrowRight')"
                        class="button-as-link expand-group flex justify-center align-center" :style="textColor"></button>
                </div>
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
    emits: ['update'],
    props: ['group', 'groupIdx'],
    data() {
        return {
            groupTitle: this.group.title,
            showPicker: false,
            editGroup: false,
        }
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },
        cmpOrder() {
            return this.$store.getters.cmpOrder
        },
        textColor() {
            return { color: this.group.color }
        },
        backgroundColor() {
            return { background: this.group.color }
        },
        taskCount() {
            return this.group.tasks.length
        },
    },
    methods: {
        getSvg(iconName) {
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
        },
        openEditGroup() {
            this.editGroup = true
        },
        onRemoveGroup() {
            this.$emit('removeGroup')
        },
        onExpand() {
            this.$emit('update', { prop: 'minimized', toUpdate: false })
        }
    },
    components: {
        ProgressBar
    }
}
</script>