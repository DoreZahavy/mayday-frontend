<template>
    <template v-if="hasMembers && members.length > 2">
        <MemberPreview :member="members[0]" />
        <div v-if="members.length > 2" class="member-preview extra-persons">+{{ members.length - 1 }}</div>
    </template>

    <template else v-else-if="hasMembers && members.length > 0">
        <MemberPreview v-for="(member, idx) in members" :key="idx" :member="member" />
    </template>

    <span class="person-icon" v-else v-icon="'person'"></span>
    <!-- <span class="person-icon" v-else v-html="getSvg('person')"></span> -->
    <span class="plus-icon" v-icon="'plusSign'"></span>
</template>
<script>
import MemberPreview from "@/cmps/MemberPreview.vue"
export default {
    props: { info: Array },
    computed: {
        hasMembers() {
            return true
            // return (this.info[0]?._id)
        },
        data() {
    return {
    //   members: [...this.info],
    }
  },
    },
    components:{
        MemberPreview
    }
}
</script>

