<template>
  <div class="col-md-3 mb-4">
    <div class="card h-100 shadow-sm">
      <img :src="product.image" class="card-img-top" :alt="product.name">
      <div class="card-body text-center">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text text-muted">{{ product.category }}</p>
        <p class="fw-bold text-success">${{ product.price }}</p>
        <button class="btn btn-outline-primary btn-sm">Agregar al carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>
