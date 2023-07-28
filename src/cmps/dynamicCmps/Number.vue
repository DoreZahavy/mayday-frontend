<template>
    <section class="number-cmp">
        <span v-if="info" :contenteditable="editing" :class="{ editable: editing }" @click="startEditing"
            @keydown="checkEnter" @blur="stopEditing" ref="editor">
            {{ editing ? info : formatCurrency(info) }}
        </span>
        <div v-else>
            <span class="icon plus-icon" v-html="getSvg('addUser')"></span>
            <span class="icon nums-icon" v-html="getSvg('nums')"></span>
        </div>
    </section>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
    name: "Number",
    props: ['info'],
    data() {
        return {
            editing: false,
            caretMoved: false
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', minimumFractionDigits: 0, currency: 'USD' }).format(value)
        },
        startEditing() {
            console.log(this.info)
            this.editing = true
            this.$nextTick(() => {
                this.moveCaretToInputEnd()
            })
        },
        stopEditing() {
            console.log(this.$refs.editor.innerText)
            this.caretMoved = false
            this.editing = false
            this.$emit('update', Number(this.$refs.editor.innerText))
        },
        checkEnter(event) {
            if (event.keyCode === 13) {
                this.stopEditing()
            }
        },
        moveCaretToInputEnd() {
            if (this.caretMoved) return
            const editor = this.$refs.editor
            const range = document.createRange()
            range.selectNodeContents(editor)
            range.collapse(false)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            editor.focus()
            this.caretMoved = true
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>
