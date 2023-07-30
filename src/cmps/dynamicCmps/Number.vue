<template>
    <section class="number-cmp fs15" :class="{ 'input-focused': editing }">
        <div class="text-container">
            <span v-show="!editing && (number || number === 0)" @click="startEditing">{{ formatCurrency(number) }}</span>
            <input v-show="editing" ref="editor" v-model="number" @blur="stopEditing" @keydown.enter.prevent="stopEditing"
                @keypress="isNumber($event)" class="editable-text fs16" type="text" @click="startEditing">
            <div v-show="!number && number !== 0 && !editing" @click="startEditing">
                <span class="icon plus-icon" v-html="getSvg('plusSign')"></span>
                <span class="icon nums-icon" v-html="getSvg('nums')"></span>
            </div>
        </div>
        <div v-if="showButton" class="reset-text" @click="clearNumber">
            <span class="x-icon" v-html="getSvg('xButton')">
            </span>
        </div>
    </section>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
    name: "Number",
    props: ['info'],
    data() {
        return {
            editing: false,
            number: this.info
        }
    },
    computed: {
        showButton() {
            return !this.editing && (this.number || this.number === 0)
        }
    },
    methods: {
        isNumber(evt) {
            const charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault()
            } else {
                return true
            }
        },
        formatCurrency(value) {
            if (value === 0) {
                return '$0';
            }
            return new Intl.NumberFormat('en-US', { style: 'currency', minimumFractionDigits: 0, currency: 'USD' }).format(value)
        },
        startEditing() {
            this.editing = true
            this.$nextTick(() => {
                this.moveCaretToInputEnd()
            })
        },
        stopEditing() {
            this.editing = false
            this.number = this.$refs.editor.value
            if (this.number === '') {
                this.$emit('update', null)
            } else {
                this.$emit('update', Number(this.number))
                this.number = Number(this.$refs.editor.value)
            }
        },
        clearNumber() {
            this.number = null
            this.showButton = false
            this.$emit('update', null)
        },
        moveCaretToInputEnd() {
            const editor = this.$refs.editor
            const length = editor.value.length
            editor.focus()
            editor.setSelectionRange(length, length)
        },
        getSvg(name) {
            return svgService.getSvg(name)
        }
    }
}
</script>