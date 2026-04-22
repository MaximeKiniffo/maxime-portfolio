import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import { warnMissingCv } from './utils/generatePlaceholder'

warnMissingCv()

createApp(App).use(router).mount('#app')
