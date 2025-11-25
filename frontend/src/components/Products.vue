<template>
  <section class="productos">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-dark">Productos Destacados</h2>

      <div class="row g-4">
        <div class="col-md-4" v-for="item in productos" :key="item.id">
          <ProductCard :producto="item" @add-to-cart="agregarAlCarrito" /> <!--Local Storage / Integrar con backend-->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
// INTEGRAR BACKEND
const productos = [
  { id: 1, nombre: 'Remera Verde', precio: 9500, img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg' },
  { id: 2, nombre: 'Jean Natural', precio: 12000, img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg' },
  { id: 3, nombre: 'Campera Eco', precio: 17500, img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg' }
]

function agregarAlCarrito(producto) {
  alert(`"${producto.nombre}" agregado al carrito ✅`)
}
</script>

<style scoped>
.productos {
  padding-top: 7rem;
  padding-bottom: 5rem;
  background-color: #f6f8f7;
}
</style>

