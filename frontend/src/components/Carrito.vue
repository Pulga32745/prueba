<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cart = useCartStore()
const items = cart.items

function eliminar(index) {
  cart.remove(index)
}

function actualizarCantidad(item, event) {
  cart.updateCantidad(item, Number(event.target.value))
}

const total = computed(() => cart.total)
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
          <button class="btn btn-success">Finalizar Compra</button>
        </div>

      </div>

      <div v-else class="text-center text-muted mt-5">
        Tu carrito está vacío 🛒
      </div>
    </div>
  </section>
</template>


