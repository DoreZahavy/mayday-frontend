<template>
    <section class="number-cmp">
        <div class="text-container">
            <span v-if="editing || number" :contenteditable="editing" :class="{ editable: editing }" @keydown="checkEnter"
                @blur="stopEditing" ref="editor" @click="startEditing">
                {{ editing ? number : formatCurrency(number) }}
            </span>
            <div v-else @click="startEditing">
                <span class="icon plus-icon" v-html="getSvg('plusSign')"></span>
                <span class="icon nums-icon" v-html="getSvg('nums')"></span>
            </div>
        </div>
        <div v-if="showButton" class="reset-text" @click="clearNumber">
            <span class="x-icon" v-html="getSvg('xButton')">
            </span>
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
            caretMoved: false,
            number: this.info
        }
    },
    computed: {
        showButton() {
            return !this.editing && this.number
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', { style: 'currency', minimumFractionDigits: 0, currency: 'USD' }).format(value)
        },
        startEditing() {
            this.number = 0
            this.editing = true
            this.$nextTick(() => {
                this.moveCaretToInputEnd()
            })
        },
        stopEditing() {
            this.number = this.$refs.editor.innerText
            this.caretMoved = false
            this.editing = false
            this.$emit('update', Number(this.number))
        },
        clearNumber() {
            this.number = null
            this.showButton = false
            this.$emit('update', null)
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