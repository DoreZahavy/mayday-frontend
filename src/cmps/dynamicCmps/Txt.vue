<template v-if="newTxt">
    <div v-if="!editing" class="txt" @click="editing = true">
        <p>{{ newTxt }}</p>
    </div>
    <div v-else class="txt">
        <input type="text" v-model="newTxt" @blur="onSaveTxt">
    </div>
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
            this.$emit("save", this.newTxt)
            this.editing = false
        }
    }
}
</script>