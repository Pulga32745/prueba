<template>
  <div class="row">
    <ProductCard v-for="(p, i) in products" :key="i" :product="p" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  components: { ProductCard },
data() {
  return {
    products: [
      { 
        name: 'Remera Oversize', 
        price: 7500, 
        category: 'Remeras', 
        image: new URL('@/assets/remera1.jpg', import.meta.url).href 
      },
      { 
        name: 'Campera Negra', 
        price: 18500, 
        category: 'Camperas', 
        image: new URL('@/assets/campera1.jpg', import.meta.url).href 
      }
    ]
  }
}
}

</script>
