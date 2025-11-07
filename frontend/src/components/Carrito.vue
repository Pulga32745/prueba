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
                <input type="number" v-model="item.cantidad" min="1" class="form-control w-50" />
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

<!--HACER CRUD / PARTE DEL CARRITO USUARIO -> NO BACKEND-->
<script setup>
import { reactive, computed } from 'vue'
const items = reactive([
  { nombre: 'Remera Verde', precio: 9500, cantidad: 1 },
  { nombre: 'Jean Natural', precio: 12000, cantidad: 1 }
])
const total = computed(() => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0))
function eliminar(index) {
  items.splice(index, 1)
}
</script>

