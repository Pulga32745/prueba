import './assets/main.css'
import './assets/base.css'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import router from './routes.js'

import { createApp } from 'vue'
import App from './App.vue'


import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App)
//console.log(app)
app.use(router)
app.mount('#app')


