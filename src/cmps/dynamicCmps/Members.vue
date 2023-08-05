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

      <template v-if="hasMembers && info.length > 2">
        <MemberPreview :member="info[0]" />
        <div v-if="info.length > 2" class="member-preview extra-persons">+{{ info.length - 1 }}</div>
      </template>

      <template else v-else-if="hasMembers && info.length > 0">
        <MemberPreview v-for="(member, idx) in info" :key="idx" :member="member" />
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
  emits: ['update'],
  props: { info: Array, groupColor: String },
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
      const memberIds = this.info.map(m=>m._id)
      return optionalMembers.filter(m=>!memberIds.includes(m._id))
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    removeMember(memberId) {
      const members= JSON.parse(JSON.stringify(this.info))
      const memberIdx = members.findIndex(m => m._id === memberId)
      members.splice(memberIdx, 1)
      console.log('members:', members)
      this.$emit('update', JSON.parse(JSON.stringify(members)))

      // const memberIdx = this.members.findIndex(m => m._id === memberId)
      // this.members.splice(memberIdx, 1)
      // this.$emit('update', JSON.parse(JSON.stringify(this.members)))

    },
    addMember(member) {

      const members= JSON.parse(JSON.stringify(this.info))
      members.push(member)
      console.log('members:', members)
      this.$emit('update',JSON.parse(JSON.stringify(members)))

      // this.members.push(member)
      // this.$emit('update', JSON.parse(JSON.stringify(this.members)))

      // this.$emit('add',member)
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
  width: 100%;
  display: flex;
  justify-content: center;
}

.members {
}
</style>