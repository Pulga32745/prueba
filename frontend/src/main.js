import './assets/main.css'
import './assets/base.css'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import router from './routes.js'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
//console.log(app)
app.use(router)
app.mount('#app')


