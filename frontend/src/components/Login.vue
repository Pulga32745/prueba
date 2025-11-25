<template>
  <section class="login py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Iniciar Sesión</h2>

      <form @submit.prevent="login" class="mx-auto" style="max-width: 400px;">
        
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>

        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required />
        </div>

        <button type="submit" class="btn btn-success w-100">Ingresar</button>

        <p class="text-muted mt-3">
          ¿No tenés cuenta?
          <RouterLink to="/register" class="text-success">Registrate</RouterLink>
        </p>

      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

async function login() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Error al iniciar sesión");
      return;
    }

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("userName", data.user.nombre);

    if (data.user.role === "admin") {
      router.push("/dash");
    } else {
      router.push("/home");
    }

  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
}
</script>
