<script>
import LoginHeader from '@/cmps/LoginHeader.vue'
import { showSuccessMsg, showErrorMsg, eventBusService } from '../services/event-bus.service.js'

export default {
    name: 'LoginSignup',

    data() {
        return {
            isSignup: false,
            credentials: {
                email: 'admin',
                password: 'admin'
            },
            signupInfo: {
                fullname: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch({ type: 'login', credentials:this.credentials })
                showSuccessMsg(`Login successful`)
            }
            catch (err) {
                console.log('Cannot login', err)
                showErrorMsg(`Cannot login`)
            }

        },
        async signup() {
            try {
                await this.$store.dispatch({ type: 'signup', signupInfo:this.signupInfo })
                showSuccessMsg(`Signup successful`)
            }
            catch (err) {
                console.log('Cannot signup', err)
                showErrorMsg(`Cannot signup`)
            }
        },
    },
    components: {
        LoginHeader
    }, 
    created() {
        document.title = "Mayday"
    }
}
</script>

<template>
    <section class="login-signup">
        <LoginHeader />
        <section class="auth-area">

            <form v-if="isSignup" @submit.prevent="signup">
                <h1>Signup</h1>
                <div class="input-container">
                    <span class="input-label">Full name</span>

                    <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
                </div>
                <div class="input-container">
                    <span class="input-label">Email</span>

                    <input type="text" v-model="signupInfo.email" placeholder="Email" />
                </div>
                <div class="input-container">
                    <span class="input-label">Password</span>

                    <input type="password" v-model="signupInfo.password" placeholder="Password" />
                </div>
                <!-- <button>Signup</button> -->
            </form>
            <form v-else @submit.prevent="login">
                <h1><b>Log </b>In</h1>
                <div class="input-container">
                    <span class="input-label">Email</span>
                    <input type="text" v-model="credentials.email" placeholder="Email" />
                </div>
                <div class="input-container">
                    <span class="input-label">Password</span>
                    <input type="password" v-model="credentials.password" placeholder="Password" />
                </div>
            </form>
            <button @click="signup" v-if="isSignup" class="auth-btn">Continue<span v-icon="'loginArrow'"></span></button>
            <button @click="login" v-else class="auth-btn">Log in<span v-icon="'loginArrow'"></span></button>
            <hr />
            <div class="switch">
                {{ isSignup ?
                    'Already have an account?' :
                    `Don't have an account yet?`
                }}
                <a @click="isSignup = !isSignup">
                    {{ isSignup ?
                        ' Log in' :
                        ' Sign up'
                    }}
                </a>
            </div>
        </section>
    </section>
</template>

