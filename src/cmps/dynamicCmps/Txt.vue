<template>
    <section class="txt" v-if="txt">
        <span ref="editor" :class="{ editable: editing }" :contenteditable="editing" @click="startEditing"
            @blur="stopEditing" class="editable-text">
            {{ txt }}
        </span>
    </section>
</template>

<script>
export default {
    name: "txt",
    props: {
        info: String,
    },
    data() {
        return {
            editing: false,
            txt: this.info
        }
    },
    mounted() {
    },
    methods: {
        startEditing() {
            this.editing = true
            this.$nextTick(() => {
                const editor = this.$refs.editor
                const range = document.createRange()
                range.selectNodeContents(editor)
                range.collapse(false)
                const selection = window.getSelection()
                selection.removeAllRanges()
                selection.addRange(range)
                editor.focus()
            })
        },
        stopEditing() {
            this.txt = this.$refs.editor.innerText
            this.$emit("update", { cmpType: 'Txt', data: this.txt })
            this.editing = false
        },
    },
}
</script>

<style scoped>
span.editable-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-height: 100%;
    width: 100%;
}

.editable {
    cursor: text;
}
</style>
