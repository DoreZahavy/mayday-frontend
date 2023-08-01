import { userService } from "@/services/user.service.js";

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
            return users;
        },
        loggedinUser({ loggedinUser }) {
            return loggedinUser;
        },
    },

    mutations: {
        logout(state) {
            state.loggedinUser = null
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
        }


    },
}
