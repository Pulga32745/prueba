<template>
  <nav class="navbar navbar-expand-md fixed-top bg-white shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold text-success" to="/home">
        TiendaVirtual
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link text-dark" to="/home">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-dark" to="/products">Productos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-dark" to="/offers">Ofertas</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center ms-3">
          <RouterLink to="/carrito" class="text-secondary fs-5 me-3 text-decoration-none">🛒</RouterLink>
          <RouterLink to="/login" class="btn btn-success text-white px-3">Ingresar</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.nav-link:hover {
  color: #4caf50 !important;
}
</style>
