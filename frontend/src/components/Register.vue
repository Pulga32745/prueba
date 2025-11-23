<template>
  <section class="registro py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Crear Cuenta</h2>

      <form novalidate @submit.prevent="enviar" class="mx-auto" style="max-width: 400px;">

        <!-- NOMBRE -->
        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.nombre"
            @input="formDirty.nombre = true"
            type="text"
            class="form-control"
            placeholder="Nombre completo"
          />
          <div v-if="errorNombre.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorNombre.mensaje }}
          </div>
        </div>

        <!-- EMAIL -->
        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.email"
            @input="formDirty.email = true"
            type="email"
            class="form-control"
            placeholder="Email"
          />
          <div v-if="errorEmail.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorEmail.mensaje }}
          </div>
        </div>

        <!-- PASSWORD -->
        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.password"
            @input="formDirty.password = true"
            type="password"
            class="form-control"
            placeholder="Contraseña"
          />
          <div v-if="errorPassword.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorPassword.mensaje }}
          </div>
        </div>

        <!-- CONFIRMAR -->
        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.confirmar"
            @input="formDirty.confirmar = true"
            type="password"
            class="form-control"
            placeholder="Confirmar contraseña"
          />
          <div v-if="errorConfirmar.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorConfirmar.mensaje }}
          </div>
        </div>

        <button :disabled="estadoBotonDeshabilitado()" class="btn btn-success w-100">
          Registrarme
        </button>
      </form>

      <div
        v-if="mensaje"
        class="mt-3 fw-semibold"
        :class="{ 'text-success': exito, 'text-danger': !exito }"
      >
        {{ mensaje }}
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  name: "Register",

  data() {
    return {
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
      mensaje: "",
      exito: false,
    };
  },

  computed: {
    // ------- NOMBRE -------
    errorNombre() {
      let mensaje = "";
      const v = this.formData.nombre;

      if (!v) mensaje = "Campo requerido";
      else if (v.length < 3) mensaje = "Debe tener al menos 3 caracteres";
      else if (v.length > 20) mensaje = "Debe tener menos de 20 caracteres";

      return { mensaje, mostrar: mensaje && this.formDirty.nombre, ok: !mensaje };
    },

    // ------- EMAIL -------
    errorEmail() {
      let mensaje = "";
      const v = this.formData.email;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!v) mensaje = "Email requerido";
      else if (!regex.test(v)) mensaje = "Formato inválido";

      return { mensaje, mostrar: mensaje && this.formDirty.email, ok: !mensaje };
    },

    // ------- PASSWORD -------
    errorPassword() {
      let mensaje = "";
      const v = this.formData.password;

      if (!v) mensaje = "Contraseña requerida";
      else if (v.length < 6) mensaje = "Debe tener al menos 6 caracteres";

      return { mensaje, mostrar: mensaje && this.formDirty.password, ok: !mensaje };
    },

    // ------- CONFIRMAR -------
    errorConfirmar() {
      let mensaje = "";
      const pass = this.formData.password;
      const conf = this.formData.confirmar;

      if (!conf) mensaje = "Debe confirmar la contraseña";
      else if (conf !== pass) mensaje = "Las contraseñas no coinciden";

      return { mensaje, mostrar: mensaje && this.formDirty.confirmar, ok: !mensaje };
    },
  },

  methods: {
    getInicialData() {
      return {
        nombre: null,
        email: null,
        password: null,
        confirmar: null,
      };
    },

    estadoBotonDeshabilitado() {
      return !(
        this.errorNombre.ok &&
        this.errorEmail.ok &&
        this.errorPassword.ok &&
        this.errorConfirmar.ok
      );
    },

async enviar() {
  if (this.estadoBotonDeshabilitado()) {
    this.exito = false;
    this.mensaje = "Corrige los errores";
    return;
  }

  try {
    const datos = {
      nombre: this.formData.nombre,
      email: this.formData.email,
      password: this.formData.password,
      role: "user",
    };

    const resp = await AuthService.register(datos);

    this.exito = true;
    this.mensaje = `Cuenta creada para ${resp.usuario.nombre}`;

    // Limpieza de formulario
    this.formData = this.getInicialData();
    this.formDirty = this.getInicialData();

  } catch (error) {
    // 🔥 ESTA ES LA PARTE CORRECTA PARA FETCH/AXIOS
    const msg =
      error?.response?.data?.error ||
      error.message ||
      "Error al registrar";

    this.exito = false;
    this.mensaje = msg;
  }
}

  },
};
</script>
