<template>
  <p v-if="taskTitle" ref="editor" :contenteditable="editing" @click="startEditing" @blur="stopEditing"
    :class="{ editable: editing }" class="title d-cmp">
    {{ taskTitle }}
  </p>
</template>
  
<script>
export default {
  name: "taskTitle",
  props: ['info'],
  data() {
    return {
      editing: false,
      taskTitle: this.info
    }
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
      this.taskTitle = this.$refs.editor.innerText
      this.$emit("onUpdate", { cmpType: 'TaskTitle', data: this.taskTitle })
      this.editing = false
    },
  }
}
</script>
  
<style></style>