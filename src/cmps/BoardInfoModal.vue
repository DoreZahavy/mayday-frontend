<template>
    <div class="board-info-background" @click="this.$emit('closeModal')">
    </div>
    <section class="board-info">
        <article class="board-info-inputs">
            <InPlaceEdit v-model="miniBoard.title"/>
            <InPlaceEdit v-model="miniBoard.desc"/>
        </article>
        <article class="board-info-details">

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
    created(){
    },
    components:{
        InPlaceEdit
    }
}
</script>