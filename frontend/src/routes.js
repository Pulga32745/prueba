import { createRouter, createWebHistory } from "vue-router"

import Home from "./components/Home.vue"
import Contact from "./components/Contact.vue"
import Products from "./components/Products.vue"
import Offers from "./components/Offers.vue"
import Login from "./components/Login.vue"
import Carrito from "./components/Carrito.vue"
import Register from "./components/Register.vue"
import Dash from "./components/Dash/index.vue"

// 🔒 Middleware para proteger el Dashboard
const requireAdmin = (to, from, next) => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) return next("/login")       // No logueado
  if (role !== "admin") return next("/")  // Logueado pero NO admin

  next() // Admin → entra
}

const routes = [
  { path: "/", redirect: "/home" },

  { path: "/home", component: Home },
  { path: "/products", component: Products },
  { path: "/offers", component: Offers },
  { path: "/contact", component: Contact },
  { path: "/login", component: Login },
  { path: "/carrito", component: Carrito },
  { path: "/register", component: Register },

  // 🛡️ RUTA PROTEGIDA
  { path: "/dash", component: Dash, beforeEnter: requireAdmin },

  { path: "/:pathmatch(.*)*", redirect: "/home" },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
