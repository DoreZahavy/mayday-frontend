<template>
    <section class="txt">
        <div class="text-container">
            <span v-show="!editing && text" ref="viewer" class="editable-text" @click="startEditing">
                {{ text }}
            </span>
            <input v-show="editing" ref="editor" v-model="text" @blur="stopEditing" @keydown.enter.prevent="stopEditing"
                class="editable-text">
            <span v-show="!text && !editing" @click="startEditing">
                <span class="icon plus-icon" v-html="getSvg('addUser')"></span>
                <span class="icon text-icon" v-html="getSvg('text')"></span>
            </span>
            <div v-if="showButton" class="reset-text" @click="clearText">
                <span class="x-icon" v-html="getSvg('xButton')">
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import { svgService } from '../../services/svg.service'

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
    computed: {
        showButton() {
            return !this.editing && this.text
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
            this.editing = false
            this.$emit('update', this.text)
        },
        clearText() {
            this.text = ''
            this.showButton = false
            this.$emit('update', '')
        },
        moveCaretToInputEnd() {
            const editor = this.$refs.editor
            const length = editor.value.length
            editor.focus()
            editor.setSelectionRange(length, length)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    }
}
</script>

<style scoped lang="scss">
.txt {
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;

    &:hover {
        &::before {
            opacity: 1;
        }

        .reset-text {
            display: block;
        }
    }

    &::before {
        opacity: 0;
        content: "";
        display: block;
        border: 1px solid lightgray;
        height: calc(82%);
        position: absolute;
        top: 3px;
        left: 5px;
        right: 4px;
    }

    span.icon {
        position: absolute;
        left: 50%;
        top: 1.23em;
        opacity: 0;
        cursor: pointer;

        &.text-icon {
            transform: translate(3%, -44%);
        }

        &.plus-icon {
            transform: translate(-70%, -28%);
            scale: 1.4;

            &:hover {
                filter: brightness(85%);
            }
        }
    }

    &:hover span.icon {
        opacity: 1;
    }
}

.text-container {
    position: relative;

    &:hover::before {
        border: 50px solid lightgray;
    }
}

.editable-text {
    position: absolute;
    top: 8px;
    display: inline-block;
    white-space: nowrap;
    max-width: 150px;
    text-align: center;
    vertical-align: middle;
    padding-inline: 10px;
    border: none;
    background: transparent;
    text-overflow: ellipsis;
    overflow: hidden;

    &:active,
    &:focus {
        outline: none;
    }
}

.reset-text {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 8%;
    top: 10px;
    cursor: pointer;
    display: none;
    background-color: lightgray;
    width: 1.14em;
    height: 1.1em;
    border-radius: 2px;
}
</style>
