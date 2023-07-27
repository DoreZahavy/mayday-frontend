<script>
export default {
    props: {
        modelValue: String
    },

    data() {
        return {
            editing: false,
            caretMoved: false
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
            this.caretMoved = false
            this.$emit('update:modelValue', this.$refs.editor.innerText)
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
        }
    }
}
</script>

<template>
    <section class="in-place-edit">
        <span :contenteditable="editing" :class="{ editable: editing }" @click="startEditing" @keydown="checkEnter"
            @blur="stopEditing" ref="editor">
            {{ modelValue }}
        </span>
    </section>
</template>

    