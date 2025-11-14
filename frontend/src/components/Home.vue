<template>
  <section class="home">
    <div class="hero text-center">
      <h1 class="fw-bold mt-3">Descubre tu estilo con <span class="text-success">TiendaVirtual</span></h1>
      <p class="text-muted mb-4">
        Las últimas tendencias en moda con descuentos de hasta 30% en productos seleccionados
      </p>
      <div class="d-flex justify-content-center gap-3">
        <RouterLink to="/products" class="btn btn-success text-white">Ver Catálogo</RouterLink>
        <RouterLink to="/offers" class="btn btn-outline-success">Ver Ofertas</RouterLink>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row text-center gy-4">
        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🚚 Envío Gratis</h5>
            <p class="text-muted mb-0">En compras mayores a $50</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🔒 Compra Segura</h5>
            <p class="text-muted mb-0">Pagos 100% protegidos</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🌿 Calidad Premium</h5>
            <p class="text-muted mb-0">Solo las mejores marcas eco-friendly</p>
          </div>
        </div>
      </div>
    </div>
    <hr>

    <div class="productos-destacados py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-2">Productos Destacados</h2>
        <p class="text-muted mb-5">
          Las mejores prendas seleccionadas especialmente para ti
        </p>

        <div class="row g-4">
          <div
            v-for="producto in productos"
            :key="producto.id"
            class="col-md-3 d-flex align-items-stretch"
          >
            <div class="card border-0 shadow-sm h-100 position-relative">
              <div class="position-relative">
                <img
                  :src="producto.img"
                  class="card-img-top rounded-top"
                  :alt="producto.nombre"
                />
                <div
                  v-if="producto.descuento"
                  class="badge-descuento position-absolute top-0 end-0 m-2"
                >
                  -{{ producto.descuento }}%
                </div>
              </div>
              <div class="card-body d-flex flex-column justify-content-between text-start">
                <div>
                  <small class="text-uppercase text-muted">{{ producto.categoria }}</small>
                  <h5 class="fw-semibold mb-2">{{ producto.nombre }}</h5>
                  <div class="precios d-flex align-items-baseline gap-2">
                    <h5 class="fw-bold text-success mb-0">${{ producto.precioFinal.toFixed(2) }}</h5>
                    <span
                      v-if="producto.precioOriginal"
                      class="text-muted text-decoration-line-through"
                    >
                      ${{ producto.precioOriginal.toFixed(2) }}
                    </span>
                  </div>
                </div>
                <div class="text-end mt-3">
                  <button class="btn btn-success" @click="agregarAlCarrito(producto)">
                    ¡Comprar!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <RouterLink to="/products" class="btn btn-outline-success px-4">
            Ver Todos los Productos →
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const productos = [
  {
    id: 1,
    nombre: 'Remera Oversize Premium',
    categoria: 'REMERAS',
    precioOriginal: 29.99,
    precioFinal: 23.99,
    descuento: 20,
    img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg',
  },
  {
    id: 2,
    nombre: 'Jean Skinny Fit',
    categoria: 'PANTALONES',
    precioOriginal: 49.99,
    precioFinal: 49.99,
    descuento: 0,
    img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg',
  },
  {
    id: 3,
    nombre: 'Campera de Cuero',
    categoria: 'CAMPERAS',
    precioOriginal: 129.99,
    precioFinal: 110.49,
    descuento: 15,
    img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg',
  },
  {
    id: 4,
    nombre: 'Zapatillas Urbanas',
    categoria: 'CALZADO',
    precioOriginal: 79.99,
    precioFinal: 55.99,
    descuento: 30,
    img: 'https://st2.depositphotos.com/39040180/43269/i/450/depositphotos_432698990-stock-photo-blank-shirt-color-black-template.jpg',
  },
]

function agregarAlCarrito(producto) {
  alert(`"${producto.nombre}" agregado al carrito ✅`)
}
</script>

<style scoped>
.home {
  padding-top: 6rem;
  background: linear-gradient(to bottom right, #f6f8f7, #eaf4ee);
  color: #1e1e1e;
}

.badge-descuento {
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
}

hr{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.btn-circle {
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #4caf50;
  border: 1px solid #4caf50;
  transition: all 0.3s ease;
}
.btn-circle:hover {
  background-color: #4caf50;
  color: white;
}

.card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}
</style>
