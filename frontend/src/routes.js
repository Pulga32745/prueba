import { createRouter, createWebHistory } from "vue-router"

import Home from "./components/Home.vue"
import Contact from "./components/Contact.vue"
import Products from "./components/Products.vue"
import Offers from "./components/Offers.vue"
import Login from "./components/Login.vue"
import Carrito from "./components/Carrito.vue"
import Register from "./components/Register.vue"


const routes = [
    { path: '/', redirect: '/home' },

  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/products', component: Products },
  { path: '/offers', component: Offers },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/carrito', component: Carrito },
  { path: '/register', component: Register },

    { path: '/:pathmatch(.*)*', redirect: '/home' },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
