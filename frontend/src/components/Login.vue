<template>
  <section class="login py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="login" class="mx-auto" style="max-width: 400px;">
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Ingresar</button>
        <p class="text-muted mt-3">
          ¿No tenés cuenta?
          <RouterLink to="/register" class="text-success">Registrate</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
function login() {
  alert(`Bienvenido, ${email.value}!`)
}
</script>
