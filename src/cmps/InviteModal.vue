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
            showFilteredUsers: false
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
        addUser(user) {
            this.$emit('add', user)
        },
        removeUser(memberId) {
            this.$emit('remove', memberId)
        },
        closeFilteredUsers() {
            this.showFilteredUsers = false
        }
    }
}
</script>
<template>
    <section class="invite-area">

        <div class="invite-screen" @click.stop="closeModal"></div>

        <section class="invite-modal">
            <span @click.stop="closeModal" class="x-btn" v-icon="'xButton'"></span>
            <h1>Board Members</h1>
            <div class="search-area">

                <input @click="showFilteredUsers = true" type="text" placeholder="Enter name or email" v-model="userFilter">
                <div v-out="closeFilteredUsers" v-if="showFilteredUsers" class="filtered-users">
                    <ul class="clean-list">
                        <li v-for="user in filteredUsers" @click="addUser(user)">
                            <img :src="user.imgUrl">
                            {{ user.fullname }}
                        </li>
                    </ul>
                </div>
            </div>
            <ul class=" clean-list board-members">
                <li class="member flex align-center space-between" v-for="member in boardUsers">
                    <div class="flex align-center">
                        <!-- <pre>{{ member }}</pre> -->
                        <img :src="member.imgUrl" >
                        <p>{{ member.fullname }}</p>
                    </div>
                    <span v-icon="'xButton'" @click="removeUser(member._id)"></span>
                </li>
            </ul>
        </section>
    </section>
</template>