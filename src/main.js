import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

import Notifications from '@kyvg/vue3-notification'
import { addAppGlobalProperties } from '@/plugins/appGlobalProperties.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import './assets/scss/main.scss'
import './index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Notifications)

app.component('VueDatePicker', VueDatePicker);

addAppGlobalProperties(app)

app.mount('#app')
