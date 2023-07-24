<script>
export default {
    name: 'LoginSignup',

    data() {
        return {
            isSignup: false,
            credentials: {
                username: 'admin',
                password: 'admin'
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch({ type: 'login', credentials })
                showSuccessMsg(`Login successful`)
            }
            catch (err) {
                console.log('Cannot login', err)
                showErrorMsg(`Cannot login`)
            }
       
        },
        async signup(signupInfo) {
            try {
                await this.$store.dispatch({ type: 'signup', signupInfo })
                showSuccessMsg(`Signup successful`)
            }
            catch (err) {
                console.log('Cannot signup', err)
                showErrorMsg(`Cannot signup`)
            }
        },
    }
}
</script>

<template>
    <section class="login-signup">
        <form v-if="isSignup" @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
            <input type="text" v-model="signupInfo.username" placeholder="Username" />
            <input type="password" v-model="signupInfo.password" placeholder="Password" />
            <button>Signup</button>
        </form>
        <form v-else @submit.prevent="login">
            <h2>Login</h2>
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button>Login</button>
        </form>
        <hr />
        <div className="btns">
            <a @click="isSignup = !isSignup">
                {{ isSignup ?
                    'Already a member? Login' :
                    'New user? Signup here'
                }}
            </a>
        </div>
    </section>
</template>

