<template>
  <section class="productos">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-dark">Productos Destacados</h2>

      <div class="row g-4">
        <div class="col-md-4" v-for="item in productos" :key="item.id">
          <ProductCard :producto="item" @add-to-cart="agregarAlCarrito" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';

const productos = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/products');
    const data = await res.json();

    console.log("📦 PRODUCTOS DESDE BACKEND:", JSON.stringify(data, null, 2));

    // 👉 Ordenamos por stock ascendente
    const ordenadosPorStock = [...data].sort((a, b) => a.stock - b.stock);

    // 👉 Tomamos los 3 con menos stock
    const conDescuento = ordenadosPorStock.slice(0, 3).map(p => ({
      ...p,
      precioOriginal: p.precio,
      precio: Math.round(p.precio * 0.8),
      tieneDescuento: true
    }));

    // 👉 Al resto no le hacemos nada
    const sinDescuento = ordenadosPorStock.slice(3).map(p => ({
      ...p,
      precioOriginal: null,
      tieneDescuento: false
    }));

    // 👉 Unimos todo y enviamos al v-for
    productos.value = [...conDescuento, ...sinDescuento];

  } catch (e) {
    console.error("Error obteniendo productos:", e);
  }
});

import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

function agregarAlCarrito(producto) {
  cart.addToCart(producto)
  alert(`"${producto.nombre}" agregado al carrito 🛒`)
}
</script>

<style scoped>
.productos {
  padding-top: 7rem;
  padding-bottom: 5rem;
  background-color: #f6f8f7;
}
</style>


