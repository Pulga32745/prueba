<template>
  <div class="card h-100 shadow-sm border-0">
    <img :src="producto.img_url" :alt="producto.nombre" class="card-img-top rounded-top" />

    <div class="card-body text-center">
      <h5 class="card-title fw-semibold">{{ producto.nombre }}</h5>
      <p class="text-success fw-bold mb-3">${{ producto.precio }}</p>

      <button class="btn btn-success text-white" @click="$emit('add-to-cart', producto)">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ producto: Object })
</script>



<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
}
</style>

