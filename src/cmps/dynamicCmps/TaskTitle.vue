<template>
  <p v-if="taskTitle" ref="editor" :contenteditable="editing" @click="startEditing" @blur="stopEditing"
    :class="{ editable: editing }" class="title d-cmp">
    {{ taskTitle }}
  </p>
</template>
  
<script>
export default {
  name: "TaskTitle",
  props: ['info'],
  data() {
    return {
      editing: false,
      taskTitle: this.info,
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
      this.taskTitle = this.$refs.editor.innerText
      this.caretMoved = false
      console.log(this.taskTitle)
      this.$emit('update', this.taskTitle)
      this.editing = false
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
  
<style></style>