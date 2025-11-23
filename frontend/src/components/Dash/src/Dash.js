import ProductosService from "@/services/productosService";

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

  async mounted() {
    this.productos = await ProductosService.getAll();
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

    botonDeshabilitado() {
      return (
        !this.errorNombre.ok ||
        !this.errorDescripcion.ok ||
        !this.errorPrecio.ok
      );
    },
  },

  methods: {
    getInicialData() {
      return {
        nombre: null,
        descripcion: null,
        precio: null,
        stock: null,
        id: null
      };
    },

    async guardarProducto() {
      if (this.modoEdicion) {
        await ProductosService.update(this.formData.id, this.formData);
      } else {
        await ProductosService.create(this.formData);
      }

      this.productos = await ProductosService.getAll();

      this.formData = this.getInicialData();
      this.formDirty = this.getInicialData();
      this.modoEdicion = false;
    },

    editarProducto(producto) {
      this.formData = { ...producto };
      this.modoEdicion = true;
    },

    async eliminarProducto(id) {
      if (!confirm("¿Seguro que querés eliminar este producto?")) return;

      await ProductosService.delete(id);
      this.productos = await ProductosService.getAll();
    },
  },
};