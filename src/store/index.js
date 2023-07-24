import { createStore } from 'vuex'

import { boardStore } from '@/store/modules/board.store.js'
import { userStore } from '@/store/modules/user.store.js'

export const store = createStore({
    strict: true,
    modules: {
        boardStore,
        userStore
       
    },
    state:{
       
    }
})