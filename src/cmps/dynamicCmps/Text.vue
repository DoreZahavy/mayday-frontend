<template>
    <section class="txt">
        <div class="text-container">
            <span v-show="!editing && text" ref="viewer" class="editable-text" @click="startEditing">
                {{ text }}
            </span>
            <input v-show="editing" ref="editor" v-model="text" @blur="stopEditing" @keydown.enter.prevent="stopEditing"
                class="editable-text">
            <span v-show="!text && !editing" @click="startEditing">
                <span class="icon plus-icon" v-html="getSvg('addUser')"></span>
                <span class="icon text-icon" v-html="getSvg('text')"></span>
            </span>
            <div v-if="showButton" class="reset-text" @click="clearText">
                <span class="x-icon" v-html="getSvg('xButton')">
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
    name: "Text",
    props: {
        info: String,
    },
    data() {
        return {
            editing: false,
            text: this.info
        }
    },
    computed: {
        showButton() {
            return !this.editing && this.text
        }
    },
    methods: {
        startEditing() {
            this.editing = true
            this.$nextTick(() => {
                this.moveCaretToInputEnd()
            })
        },
        stopEditing() {
            this.editing = false
            this.$emit('update', this.text)
        },
        clearText() {
            this.text = ''
            this.showButton = false
            this.$emit('update', '')
        },
        moveCaretToInputEnd() {
            const editor = this.$refs.editor
            const length = editor.value.length
            editor.focus()
            editor.setSelectionRange(length, length)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>

