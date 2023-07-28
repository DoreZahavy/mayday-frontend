<template>
    <div class="board-info-background" @click="this.$emit('closeModal')">
    </div>
    <section class="board-info">
        <article class="board-info-inputs">
            <InPlaceEdit v-model="title" />
            <InPlaceEdit v-model="desc" /> <!-- TODO: change to textarea and add bounceback -->
        </article>
        <article class="board-info-details flex flex-direction-column">
            <h3>Board info</h3>
            <article>
                <span> Workspace</span>
            </article>
            <article>
                <span> Created by</span>
            </article>
            <article>
                <span> Owners</span>
            </article>
            <article>
                <span> Board type</span>
            </article>
        </article>
    </section>
</template>
<script>
import InPlaceEdit from './InPlaceEdit.vue';

export default {
    props:
    {
        miniBoard: Object
    },
    data() {
        return {
            title: this.miniBoard.title,
            desc: this.miniBoard.desc
        }
    },
    watch:{
        title:{
            handler(){
                this.$emit('update',{prop:'title',toUpdate:this.title})
            }
        },
        desc:{
            handler(){
                this.$emit('update',{prop:'desc',toUpdate:this.desc})
            }
        }
    },
    components: {
        InPlaceEdit
    }
}
</script>