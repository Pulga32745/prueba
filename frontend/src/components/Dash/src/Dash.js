export default {
  name: "Dashboard",

  data() {
    return {
      productos: [],

      modoEdicion: false,

      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
    };
  },

  computed: {
    errorNombre() {
      let m = "";
      const v = this.formData.nombre;

      if (!v) m = "Campo requerido";
      else if (v.length < 3) m = "Debe tener al menos 3 caracteres";

      return { mensaje: m, mostrar: m && this.formDirty.nombre, ok: !m };
    },

    errorDescripcion() {
      let m = "";
      const v = this.formData.descripcion;

      if (!v) m = "Campo requerido";
      else if (v.length < 10) m = "Debe tener mínimo 10 caracteres";
      else if (v.length > 200) m = "Máximo 200 caracteres";

      return { mensaje: m, mostrar: m && this.formDirty.descripcion, ok: !m };
    },

    errorPrecio() {
      let m = "";
      const v = this.formData.precio;

      if (!v) m = "Campo requerido";
      else if (v <= 0) m = "Debe ser mayor a 0";

      return { mensaje: m, mostrar: m && this.formDirty.precio, ok: !m };
    },

/*     errorStock() {
      let m = "";
      const v = this.formData.stock;

      if (!v && v !== 0) m = "Campo requerido";
      else if (v < 0) m = "No puede ser negativo";

      return { mensaje: m, mostrar: m && this.formDirty.stock, ok: !m };
    }, */

    botonDeshabilitado() {
      return (
        !this.errorNombre.ok ||
        !this.errorDescripcion.ok ||
        !this.errorPrecio.ok
        /* !this.errorStock.ok */
      );
    },
  },

  methods: {
    getInicialData() {
      return {
        nombre: null,
        descripcion: null,
        precio: null,
        /* stock: null, */
        id: null
      };
    },

    guardarProducto() {
      // EDITAR
      if (this.modoEdicion) {
        const index = this.productos.findIndex(
          (p) => p.id === this.formData.id
        );
        this.productos.splice(index, 1, { ...this.formData });

        this.modoEdicion = false;
      } else {
        // NUEVO PRODUCTO
        const nuevo = { ...this.formData, id: Date.now() };
        this.productos.push(nuevo);
      }

      this.formData = this.getInicialData();
      this.formDirty = this.getInicialData();
    },

    editarProducto(producto) {
      this.formData = { ...producto };
      this.modoEdicion = true;
    },

    eliminarProducto(id) {
      if (!confirm("¿Seguro que querés eliminar este producto?")) return;
      this.productos = this.productos.filter((p) => p.id !== id);
    },
  },
};
