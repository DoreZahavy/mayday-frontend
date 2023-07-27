<template>
    <section class="in-place-edit">
        <span :contenteditable="editing" :class="{ editable: editing }" @click="startEditing" @keydown="checkEnter"
            @blur="stopEditing" ref="editor">
            {{ editing ? info : formatCurrency(info) }}
        </span>
    </section>
</template>

<script>
export default {
    name: "Number",
    props: ['info'],
    data() {
        return {
            editing: false,
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
            this.editing = false
            this.$emit('update', Number(this.$refs.editor.innerText))
        },
        checkEnter(event) {
            if (event.keyCode === 13) {
                this.stopEditing()
            }
        },
        moveCaretToInputEnd() {
            const editor = this.$refs.editor
            const range = document.createRange()
            range.selectNodeContents(editor)
            range.collapse(false)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            editor.focus()
        }
    }
}
</script>
