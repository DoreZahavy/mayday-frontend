import { createStore } from 'vuex'

import { dataStore } from '@/store/modules/data.store.js'

export const store = createStore({
    strict: true,
    modules: {
        dataStore,
       
    },
    state:{
       
    }
})