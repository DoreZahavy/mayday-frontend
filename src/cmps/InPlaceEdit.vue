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
        },
        checkEnter(event){
            if(event.keyCode===13){
                this.onBlur()
            }
        }
    }
}
</script>

<template>
    <section class="in-place-edit">
        <span @click="isEditMode = true" :contenteditable="isEditMode" :class="{ editable: isEditMode }" @keydown="checkEnter" @blur="onBlur" ref="val">
            {{ modelValue }}
        </span>
        <!-- <button v-show="!isEditMode" @click="isEditMode = true">
            ✎
        </button> -->
    </section>
</template>

    