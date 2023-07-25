<template>
    <section v-if="newTxt">
        <span :contenteditable="editing" :class="{ editable: editing }" @blur="onSaveTxt" ref="val" @click="editing = true"
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
        onSaveTxt() {
            this.newTxt = this.$refs.val.innerText
            this.$emit("save", this.newTxt)
            this.editing = false
        }
    }
}
</script>

<style scoped>
.editable-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-height: 100%;
    width: 100%;
}

.editable {}
</style>
