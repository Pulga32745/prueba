import { createRouter, createWebHistory } from "vue-router"

import Home from "./components/Home.vue"
import Contact from "./components/Contact.vue"
import Products from "./components/Products.vue"


const routes = [
    { path: '/', redirect: '/home' },

  { path: '/home', component: Home },
  { path: '/products', component: Products },
  { path: '/contact', component: Contact },

    { path: '/:pathmatch(.*)*', redirect: '/home' },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router