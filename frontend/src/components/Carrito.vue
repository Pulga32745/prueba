<script setup>
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'
import axios from 'axios'

const cart = useCartStore()
const items = cart.items

function eliminar(index) {
  cart.remove(index)
}

function actualizarCantidad(item, event) {
  cart.updateCantidad(item, Number(event.target.value))
}

const total = computed(() => cart.total)

// 🟩 NUEVO: mensaje de respuesta
const mensaje = ref("")

// 🟩 NUEVO: función finalizar compra
async function finalizarCompra() {
  try {
    const payload = {
      items: cart.items.map(item => ({
        producto_id: item.id,
        nombre_producto: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        precio_final: item.precio * item.cantidad
      }))
    }

    await axios.post("http://localhost:3000/api/compras", payload)

    mensaje.value = "Compra realizada con éxito 🎉"

    cart.clear() // vacía el carrito

  } catch (err) {
    console.error(err)
    mensaje.value = "Error al procesar la compra"
  }
}
</script>

<template>
  <section class="carrito py-5">
    <div class="container">
      <h2 class="fw-bold text-success text-center mb-4">Tu Carrito</h2>

      <div v-if="items.length" class="table-responsive">

        <table class="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, i) in items" :key="i">
              <td>{{ item.nombre }}</td>
              <td>${{ item.precio }}</td>

              <td>
                <input
                  type="number"
                  min="1"
                  :max="item.stock"
                  :value="item.cantidad"
                  @change="actualizarCantidad(item, $event)"
                  class="form-control w-50"
                />
              </td>

              <td>${{ (item.precio * item.cantidad).toFixed(2) }}</td>

              <td>
                <button @click="eliminar(i)" class="btn btn-sm btn-outline-danger">✕</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-end fw-bold fs-5 mt-3">
          Total: ${{ total }}
        </div>

        <div class="text-end mt-3">
          <button class="btn btn-success" @click="finalizarCompra">
            Finalizar Compra
          </button>
        </div>

       
        <div v-if="mensaje" class="alert alert-success mt-3">
          {{ mensaje }}
        </div>

      </div>

      <div v-else class="text-center text-muted mt-5">
        Tu carrito está vacío 🛒
      </div>
    </div>
  </section>
</template>
