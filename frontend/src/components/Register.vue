<template>
  <section class="registro py-5">
    <div class="container text-center">
      <h2 class="fw-bold text-success mb-4">Crear Cuenta</h2>

      <form novalidate @submit.prevent="enviar" class="mx-auto" style="max-width: 400px;">

        <!-- NOMBRE -->
        <div class="mb-3 text-start">
          <input   v-model.trim="formData.nombre"   @input="formDirty.nombre = true" type="text"  class="form-control"  placeholder="Nombre completo"
          >
          <div v-if="errorNombre.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorNombre.mensaje }}
          </div>
        </div>

        <!-- EMAIL -->
        <div class="mb-3 text-start">
          <input  v-model.trim="formData.email"  @input="formDirty.email = true" type="email"  class="form-control"  placeholder="Email" >
          <div v-if="errorEmail.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorEmail.mensaje }}
          </div>
        </div>

        <!-- PASSWORD -->
        <div class="mb-3 text-start">
          <input  v-model.trim="formData.password" @input="formDirty.password = true"type="password" class="form-control" placeholder="Contraseña">
          <div v-if="errorPassword.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorPassword.mensaje }}
          </div>
        </div>

        <!-- CONFIRMAR -->
        <div class="mb-3 text-start">
          <input  v-model.trim="formData.confirmar" @input="formDirty.confirmar = true" type="password"  class="form-control"  placeholder="Confirmar contraseña">
          <div v-if="errorConfirmar.mostrar" class="alert alert-danger my-1 p-2"> {{ errorConfirmar.mensaje }}</div>
        </div>

        <button :disabled="estadoBotonDeshabilitado()"> Registrarme
        </button>

      </form>

      <div v-if="mensaje" class="mt-3 fw-semibold":class="{'text-success': exito, 'text-danger': !exito}">
        {{ mensaje }}
      </div>
    </div>
  </section>
</template>




<script>

export default {
  name: 'Register',

  data() {
    return {
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
      mensaje: '',
      exito: false
    }
  },

  computed: {
    // ------- NOMBRE -------
    errorNombre() {
      let mensaje = ''
      let nombre = this.formData.nombre

      if (!nombre) mensaje = 'Campo requerido'
      else if (nombre.length < 3) mensaje = 'Debe tener al menos 3 caracteres'
      else if (nombre.length > 20) mensaje = 'Debe tener menos de 20 caracteres'

      return {
        mensaje,
        mostrar: mensaje !== '' && this.formDirty.nombre,
        ok: mensaje === ''
      }
    },

    // ------- EMAIL -------
    errorEmail() {
      let mensaje = ''
      let email = this.formData.email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!email) mensaje = 'Email requerido'
      else if (!regex.test(email)) mensaje = 'Formato inválido'

      return {
        mensaje,
        mostrar: mensaje !== '' && this.formDirty.email,
        ok: mensaje === ''
      }
    },

    // ------- PASSWORD -------
    errorPassword() {
      let mensaje = ''
      let pass = this.formData.password

      if (!pass) mensaje = 'Contraseña requerida'
      else if (pass.length < 6) mensaje = 'Debe tener al menos 6 caracteres'

      return {
        mensaje,
        mostrar: mensaje !== '' && this.formDirty.password,
        ok: mensaje === ''
      }
    },

    // ------- CONFIRMAR -------
    errorConfirmar() {
      let mensaje = ''
      const pass = this.formData.password
      const confirmar = this.formData.confirmar

      if (!confirmar) mensaje = 'Debe confirmar la contraseña'
      else if (confirmar !== pass) mensaje = 'Las contraseñas no coinciden'

      return {
        mensaje,
        mostrar: mensaje !== '' && this.formDirty.confirmar,
        ok: mensaje === ''
      }
    }
  },

  methods: {
    getInicialData() {
      return {
        nombre: null,
        email: null,
        password: null,
        confirmar: null
      }
    },

    estadoBotonDeshabilitado() {
      return !(
        this.errorNombre.ok &&
        this.errorEmail.ok &&
        this.errorPassword.ok &&
        this.errorConfirmar.ok
      )
    },

    enviar() {
      if (this.estadoBotonDeshabilitado()) {
        this.mensaje = "Corrige los errores"
        this.exito = false
        return
      }

      const datos = { ...this.formData }
      console.log("Registrado:", datos)

      this.mensaje = `Cuenta creada para ${this.formData.nombre}`
      this.exito = true

      this.formData = this.getInicialData()
      this.formDirty = this.getInicialData()
    }
  }
}

</script>