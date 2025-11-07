<template>
  <section class="offers py-5">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-success">Ofertas Exclusivas</h2>
      <div class="row g-4">
        <div v-for="p in ofertas" :key="p.id" class="col-md-4">
          <div class="card border-0 shadow-sm">
            <img :src="p.img" class="card-img-top" />
            <div class="card-body">
              <h5 class="fw-semibold">{{ p.nombre }}</h5>
              <p class="text-muted text-decoration-line-through">${{ p.precioOriginal }}</p>
              <p class="text-success fw-bold">${{ p.precio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const ofertas = [
  { id: 1, nombre: 'Campera Eco', precio: 9500, precioOriginal: 13500, img: '/assets/campera.jpg' },
  { id: 2, nombre: 'Remera Verde', precio: 5500, precioOriginal: 7500, img: '/assets/remera-verde.jpg' },
  { id: 3, nombre: 'Zapatillas Urbanas', precio: 11000, precioOriginal: 15000, img: '/assets/nike.jpg' },
]
</script>
