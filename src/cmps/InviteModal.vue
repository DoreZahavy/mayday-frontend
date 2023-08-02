<script>
import { svgService } from '@/services/svg.service'
export default {
    created() {
        this.$store.dispatch({ type: 'loadUsers' })

    },
    computed: {
        filteredUsers() {
            var filteredUsers = this.$store.getters.usersExcludeMe
            const regex = new RegExp(this.userFilter, 'i')
            return filteredUsers.filter(user => regex.test(user.fullname))
        },
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        boardUsers() {
            return this.$store.getters.boardUsers
        },
        users() {
            return this.$store.getters.users
        }
    },
    data() {
        return {
            userFilter: '',
            showFilteredUsers:false
            // boardUsers:[]
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        addUser(userId){
            console.log('userId:', userId)
            this.$emit('add',userId)
        },
        closeFilteredUsers(){
            this.showFilteredUsers = false
        }
    }
}
</script>
<template>
    <section class="invite-area">

        <div class="invite-screen" @click.stop="closeModal"></div>

        <section class="invite-modal">
            <h1>Board Members</h1>
            <div class="search-area">

                <input @click="showFilteredUsers=true" type="text" placeholder="Enter name or email" v-model="userFilter">
                <div v-out="closeFilteredUsers" v-if="showFilteredUsers" class="filtered-users">
                    <ul class="clean-list">
                        <li v-for="user in users" @click="addUser(user._id)">
                            <img :src="user.imgUrl">
                            {{ user.fullname }}
                        </li>
                    </ul>
                </div>
            </div>
            <ul class=" clean-list board-members">
                <li class="member flex align-center space-between" v-for="member in boardUsers">
                    <div class="flex align-center">

                        <img :src="member.imgUrl" >
                        <p>{{ member.fullname }}</p>
                    </div>
                    <span v-icon="'xButton'"></span>
                </li>
            </ul>
            <!-- <select v-model="boardUsers">
                <option v-for="user in users" :key="user._id" :value="user._id">
                    {{ user.fullname }}
                </option>
            </select> -->
        </section>
    </section>
</template>