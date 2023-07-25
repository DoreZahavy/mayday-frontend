<script>
export default {
    props: {
        modelValue: String
    },

    data() {
        return {
            isEditMode: false
        }
    },
    methods: {
        onBlur() {
            this.isEditMode = false
            this.$emit('update:modelValue', this.$refs.val.innerText)
        }
    }
}
</script>

<template>
    <section class="in-place-edit">
        <span :contenteditable="isEditMode" :class="{ editable: isEditMode }" @blur="onBlur" ref="val">
            {{ modelValue }}
        </span>
        <button v-show="!isEditMode" @click="isEditMode = true">
            ✎
        </button>
    </section>
</template>

    