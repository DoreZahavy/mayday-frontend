import { createStore } from 'vuex'

import { dataStore } from '@/store/modules/data.store.js'
import { userStore } from '@/store/modules/user.store.js'

export const store = createStore({
    strict: true,
    modules: {
        dataStore,
        userStore
       
    },
    state:{
       
    }
})