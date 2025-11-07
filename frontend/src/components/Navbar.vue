<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm fixed-top">
    <div class="container-fluid">
      <!-- Marca -->
      <RouterLink class="navbar-brand fw-bold text-info" to="/home">👕 Tienda Ropa</RouterLink>

      <!-- Botón hamburguesa -->
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

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/home">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/products">Productos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/contact">Contacto</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease;
}

/* Estilo cuando se hace scroll */
.navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

/* Enlace activo (resalta la sección actual) */
.nav-link.active {
  color: #00d4ff !important;
  font-weight: bold;
  border-bottom: 2px solid #00d4ff;
  transition: all 0.2s ease;
}

/* Hover más suave */
.nav-link:hover {
  color: #b3eaff !important;
}
</style>
