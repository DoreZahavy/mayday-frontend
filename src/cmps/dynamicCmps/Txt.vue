<template>
    <section class="txt" v-if="newTxt">
        <span :contenteditable="editing" :class="{ editable: editing }" @blur="onSaveTxt" ref="val" @click="onClick"
            class="editable-text">
            {{ newTxt }}
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
            newTxt: this.info
        }
    },
    methods: {
        onClick() {
            if (!this.editing) {
                this.editing = true
                this.$nextTick(() => {
                    this.placeCaretAtEnd()
                })
            } else {
                this.placeCaretAtEnd()
            }
        },
        placeCaretAtEnd() {
            const range = document.createRange()
            range.selectNodeContents(this.$refs.val)
            range.collapse(false)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
        },
        onSaveTxt() {
            this.newTxt = this.$refs.val.innerText
            this.$emit("save", this.newTxt)
            this.editing = false
        }
    }
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

.editable {}
</style>
