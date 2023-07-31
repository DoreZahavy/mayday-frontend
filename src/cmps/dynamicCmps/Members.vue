<template >
  <!-- <section class="members-cmp"> -->

  <el-tooltip placement="bottom" trigger="click" effect="light">
    <template #content>
      <div class="user-container">
        <div v-if="hasMembers" class="user-pill" v-for="member in info" :key="member._id">
          <img :src="member.imgUrl">
          <span>{{ member.fullname }}</span>
          <span @click="removeMember(member._id)" class="x-btn" v-icon="'xButton'"></span>
        </div>
      </div>
      <input class="members-search" type="search" placeholder="Search names">
      <ul class="user-list clean-list">
        <li class="suggested-member" v-for="member in optionalMembers" @click="addMember(member)">
          <img :src="member.imgUrl">
          <span>{{ member.fullname }}</span>
        </li>
      </ul>
    </template>
    <section class="members-list">

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

    </section>
  </el-tooltip>
  <!-- </section> -->
</template>
  
<script>
import MemberPreview from "@/cmps/MemberPreview.vue"
import { svgService } from '../../services/svg.service.js'

export default {
  name: "Members",
  // emits: ["update"],
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
      return (this.info[0]?._id)
    },
    optionalMembers() {
      let optionalMembers = this.$store.getters.boardMembers
      return optionalMembers
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    removeMember(memberId) {
      // const members= JSON.parse(JSON.stringify(this.info))
      // console.log('this.members:', this.members)
      // console.log(this.members);
      const memberIdx = this.members.findIndex(m => m._id === memberId)
      this.members.splice(memberIdx, 1)
      this.$emit('update', this.members)

    },
    addMember(member) {
      this.members.push(member)
      this.$emit('update', JSON.parse(JSON.stringify(this.members)))

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