<template>
  <section class="contact py-5">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-dark">Contáctanos</h2>
      <form @submit.prevent="enviar" class="mx-auto" style="max-width: 500px;">
        <div class="mb-3">
          <input type="text" v-model="nombre" class="form-control" placeholder="Tu nombre" required />
        </div>
        <div class="mb-3">
          <input type="email" v-model="email" class="form-control" placeholder="Tu email" required />
        </div>
        <div class="mb-3">
          <textarea v-model="mensaje" class="form-control" placeholder="Tu mensaje..." rows="4" required></textarea>
        </div>
        <button type="submit" class="btn btn-success w-100 text-white">Enviar</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const nombre = ref('')
const email = ref('')
const mensaje = ref('')
function enviar() {
  alert('Mensaje enviado ✅')
  nombre.value = email.value = mensaje.value = ''
}
</script>
