<template>
  <section class="members-list">

    <template v-if="hasMembers && members.length>2">
      <MemberPreview :member="members[0]" />
      <div v-if="members.length>2" class="member-preview extra-persons">+{{ members.length-1 }}</div>
    </template>

    <template else v-else-if="hasMembers && members.length>0">
      <MemberPreview v-for="(member, idx) in members" :key="idx" :member="member" />
    </template>

    <span class="person-icon" v-else v-icon="'person'"></span>
    <!-- <span class="person-icon" v-else v-html="getSvg('person')"></span> -->
    <span class="plus-icon" v-icon="'plusSign'"></span>

  </section>
</template>
  
<script>
import MemberPreview from "@/cmps/MemberPreview.vue"
import { svgService } from '../../services/svg.service.js'

export default {
  name: "Members",
  emits: ["update"],
  props: { info: Array },
  data() {
    return {
      members: this.info,
    }
  },
  components: {
    MemberPreview,
  },
  computed: {
    hasMembers() {
      return (this.info[0]._id)
    },
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }
  }
}
</script>
  
<style >
p {
  margin: 0;
}

.members-list {
  display: inline-flex;
  justify-items: center;
  flex-direction: row;
  /* background-color: lightseagreen; */
  width: 100%;
  display: flex;
  justify-content: center;
}

.members {
  /* background-color: lightseagreen; */
}
</style>