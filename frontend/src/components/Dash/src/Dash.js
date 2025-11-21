export default {
  name: "Dashboard",

  data() {
    return {
      productos: [],

      formData: this.getInicialData(),
      formDirty: this.getInicialData()
    };
  },

  computed: {
    // VALIDACIÓN NOMBRE
    errorNombre() {
      let mensaje = "";
      const n = this.formData.nombre;

      if (!n) mensaje = "Campo requerido";
      else if (n.length < 3) mensaje = "Debe tener al menos 3 caracteres";

      return {
        mensaje,
        mostrar: mensaje !== "" && this.formDirty.nombre,
        ok: mensaje === ""
      };
    },

    // VALIDACIÓN PRECIO
    errorPrecio() {
      let mensaje = "";
      const p = this.formData.precio;

      if (!p && p !== 0) mensaje = "Campo requerido";
      else if (p <= 0) mensaje = "Debe ser un número mayor a 0";

      return {
        mensaje,
        mostrar: mensaje !== "" && this.formDirty.precio,
        ok: mensaje === ""
      };
    },

    // VALIDACIÓN STOCK
    errorStock() {
      let mensaje = "";
      const s = this.formData.stock;

      if (!s && s !== 0) mensaje = "Campo requerido";
      else if (s < 0) mensaje = "El stock no puede ser negativo";

      return {
        mensaje,
        mostrar: mensaje !== "" && this.formDirty.stock,
        ok: mensaje === ""
      };
    },

    botonDeshabilitado() {
      return !this.errorNombre.ok || !this.errorPrecio.ok || !this.errorStock.ok;
    }
  },

  methods: {
    // Estado inicial del form
    getInicialData() {
      return {
        nombre: null,
        precio: null,
        stock: null
      };
    },

    // Guarda un producto en la tabla
    guardarProducto() {
      const nuevo = { ...this.formData };
      this.productos.push(nuevo);

      this.formData = this.getInicialData();
      this.formDirty = this.getInicialData();
    }
  }
};
