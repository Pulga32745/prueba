<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Nuestros Productos</h2>
    <ProductList />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
export default { components: { ProductList } }
</script>
