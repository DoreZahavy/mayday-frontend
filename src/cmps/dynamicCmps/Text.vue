<template>
    <section class="txt" v-if="text">
        <span ref="editor" :class="{ editable: editing }" :contenteditable="editing" @click="startEditing"
            @blur="stopEditing" @keydown="checkEnter" class="editable-text">
            {{ text }}
        </span>
    </section>
</template>

<script>
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
    mounted() {
    },
    methods: {
        startEditing() {
            this.editing = true
            this.$nextTick(() => {
                this.moveCaretToInputEnd()
            })
        },
        stopEditing() {
            this.txt = this.$refs.editor.innerText
            this.$emit('update', this.text)
            this.editing = false
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
    },
}
</script>

<style scoped>
/* span.editable-text {
    overflow: hidden;
    white-space: nowrap;
    max-height: 100%;
    width: 100%;
}

.editable {
    cursor: text;
} */
</style>
