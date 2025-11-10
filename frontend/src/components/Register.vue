<template>
  <section class="registro py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Crear Cuenta</h2>
      <form @submit.prevent="registrar" class="mx-auto" style="max-width: 400px;">
        <input v-model="nombre" type="text" class="form-control mb-3" placeholder="Nombre completo" />
        <div v-if="errores.nombre" class="text-danger mb-2">{{ errores.nombre }}</div>

        <input v-model="email" type="email" class="form-control mb-3" placeholder="Email" />
        <div v-if="errores.email" class="text-danger mb-2">{{ errores.email }}</div>

        <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />
        <div v-if="errores.password" class="text-danger mb-2">{{ errores.password }}</div>

        <input v-model="confirmar" type="password" class="form-control mb-3" placeholder="Confirmar contraseña" />
        <div v-if="errores.confirmar" class="text-danger mb-2">{{ errores.confirmar }}</div>

        <button type="submit" class="btn btn-success w-100">Registrarme</button>
      </form>
      <div v-if="mensaje" :class="{'text-success': exito, 'text-danger': !exito}" class="mt-3">
        {{ mensaje }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmar = ref('')
const mensaje = ref('')
const exito = ref(false)

const errores = ref({
  nombre: '',
  email: '',
  password: '',
  confirmar: ''
})

// Función para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function registrar() {
  // Limpiar errores previos
  errores.value = {
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  }
  mensaje.value = ''
  exito.value = false

  // Validaciones
  let valido = true

  if (!nombre.value.trim()) {
    errores.value.nombre = 'El nombre es obligatorio'
    valido = false
  }

  if (!email.value.trim()) {
    errores.value.email = 'El email es obligatorio'
    valido = false
  } else if (!validarEmail(email.value)) {
    errores.value.email = 'El email no tiene un formato válido'
    valido = false
  }

  if (!password.value) {
    errores.value.password = 'La contraseña es obligatoria'
    valido = false
  } else if (password.value.length < 6) {
    errores.value.password = 'La contraseña debe tener al menos 6 caracteres'
    valido = false
  }

  if (!confirmar.value) {
    errores.value.confirmar = 'La confirmación es obligatoria'
    valido = false
  } else if (password.value !== confirmar.value) {
    errores.value.confirmar = 'Las contraseñas no coinciden'
    valido = false
  }

  if (valido) {
    // Aquí podemos agregar lógica para registrar en backend
    mensaje.value = `Cuenta creada para ${nombre.value} ✅`
    exito.value = true
  } else {
    mensaje.value = 'Por favor, corrige los errores'
  }
}
</script>