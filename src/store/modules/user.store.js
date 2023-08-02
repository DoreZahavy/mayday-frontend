import { userService } from "@/services/user.service.js"

export const userStore = {
    strict: true,
    state() {
        return {
            users: [],
            loggedinUser: {},
        }
    },

    getters: {
        users({ users }) {
            return users
        },
        loggedinUser({ loggedinUser }) {
            return loggedinUser
        },
        usersExcludeMe({users, loggedinUser}) {
            return users.filter(u => u._id !== loggedinUser._id)
        },
    },

    mutations: {
        logout(state) {
            state.loggedinUser = null
        },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = (user)? {...user} : null
        },
        setUsers(state, { users }) {
            state.users = users
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },

    actions: {

        async login({ commit }, { credentials }) {
            try {
                const user = await userService.login(credentials)
                commit({ type: "setUser", user })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async signup({ commit }, { signupInfo }) {
            try {
                console.log('signupInfo:', signupInfo)
                const user = await userService.signup(signupInfo)
                commit({ type: "setUser", user })
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'logout' })
                return Promise.resolve()
            }
            catch (err) {
                console.log(err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await userService.query()
                return commit({ type: "setUsers", users })
            } catch {
                console.log(err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        // async updateUser({ commit }, { user }) {
        //     try {
        //         user = await userService.update(user)
        //         commit({ type: 'setUser', user })
        //     } catch (err) {
        //         console.log('userStore: Error in updateUser', err)
        //         throw err
        //     }

        // },


    },
}
