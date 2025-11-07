<template>
  <section class="registro py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Crear Cuenta</h2>
      <form @submit.prevent="registrar" class="mx-auto" style="max-width: 400px;">
        <input v-model="nombre" type="text" class="form-control mb-3" placeholder="Nombre completo" required />
        <input v-model="email" type="email" class="form-control mb-3" placeholder="Email" required />
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" required />
        <input v-model="confirmar" type="password" class="form-control mb-3" placeholder="Confirmar contraseña" required />
        <button type="submit" class="btn btn-success w-100">Registrarme</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmar = ref('')
function registrar() {
  if (password.value !== confirmar.value) {
    alert('Las contraseñas no coinciden ❌')
    return
  }
  alert(`Cuenta creada para ${nombre.value} ✅`)
}
</script>
