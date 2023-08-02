
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    get,
    query
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



async function login({ email, password }) {
    console.log('email:', email)
    const user = await httpService.post(`auth/login`, { email, password })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user

    // return axios.post('/api/auth/login', { email, password })
    //     .then(res => res.data)
    //     .then(user => {
    //         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    //         return user
    //     })
}

async function signup({ email, password, fullname }) {

console.log('email,password,fullname:', email,password,fullname)
    const user = await httpService.post(`auth/signup`, { email, password, fullname })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
    // return axios.post('/api/auth/signup', { email, password, fullname })
    //     .then(res => res.data)
    //     .then(user => {
    //         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    //         return user
    //     })
}

async function logout() {
    console.log('logging out service')
    await httpService.post(`auth/logout`)
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

    // return axios.post('/api/auth/logout')
    //     .then(() => {
    //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    //     })
}

async function get(userId) {
    const user = await httpService.get(`user/` + userId)
    return user

    // return axios.get('/api/auth/' + userId).then(res => res.data)
}

async function query() {
    return await httpService.get('user')
}

function getEmptyCredentials() {
    return {
        email: '',
        password: '',
        fullname: ''
    }
}

