<template>
    <div class="board-info-background" @click="this.$emit('closeModal')">
    </div>
    <section class="board-info">
        <article class="board-info-inputs">
            title <br>
            description
        </article>
        <article class="board-info-details">

        </article>
    </section>
</template>
<script>
export default {
    props:
    {
        board: Object
    },
    created(){
    }
}
</script>