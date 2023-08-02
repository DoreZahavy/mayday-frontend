// import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/styles/styles.scss'
import { store } from '@/store'
import { clickOutside, icon, focusDirective } from './directives.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(ElementPlus)
app.directive('focus', focusDirective)
app.directive('icon', icon)
app.directive('out', clickOutside)
app.use(router)
app.use(store)
app.mount('#app')
