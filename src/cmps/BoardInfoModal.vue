<template>
    <div class="board-info-background" @click="this.$emit('closeModal')">
    </div>
    <section class="board-info">
        <article class="board-info-inputs">
            <InPlaceEdit v-model="title" class="title" />
            <InPlaceEdit v-model="desc" /> <!-- TODO: change to textarea and add bounceback -->
        </article>
        <article class="board-info-details flex flex-direction-column">
            <div>
                <button class="button-as-link close-modal-btn" @click="this.$emit('closeModal')">&#10005;</button>
            </div>
            <h3>Board info</h3>
            <!-- <article >
                <span class="info-title">Workspace</span>
                
            </article> -->
            <article>
                <span>Created by</span>
                <div class="flex align-center subtitle">
                    <img class="info-user-img" :src="'http://res.cloudinary.com/dbdrnjhpm/image/upload/v1690985351/din_ak4ira.jpg'" /> 
                    <p>Din Ben-Dor</p>
                </div>
            </article>
            <article>
                <span class="info-title">Owners</span>
                <div class="flex align-center subtitle">
                    <img class="info-user-img" :src="'http://res.cloudinary.com/dbdrnjhpm/image/upload/v1690985987/yona_-_Copy_pfqmrb.jpg'" /> 
                    <p>Yona Stephenson</p>
                </div>
            </article>
            <article>
                <span class="info-title">Board type</span>
                <div class="flex align-center board-type">
                    <span v-icon="'boardType'"></span>
                    <p>This board is public, visible to all team members.</p>
                </div>
            </article>
        </article>
    </section>
</template>
<script>
import InPlaceEdit from './InPlaceEdit.vue'

export default {
    emits: ['update'],
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
    watch: {
        title: {
            handler() {
                this.$emit('update', { prop: 'title', toUpdate: this.title })
            }
        },
        desc: {
            handler() {
                this.$emit('update', { prop: 'desc', toUpdate: this.desc })
            }
        }
    },
    components: {
        InPlaceEdit
    }
}
</script>
<style scoped>

</style>