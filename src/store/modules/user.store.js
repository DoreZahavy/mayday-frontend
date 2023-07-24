// import { userService } from "@/services/user.service.js";

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

    },

    actions: {
    },
}
