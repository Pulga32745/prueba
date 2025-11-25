import ProductosService from "@/services/productosService";
import { getProductStats, getPriceAnalytics } from "@/services/productStats";

export default {
  name: "Dashboard",

  data() {
    return {
      productos: [],
      modoEdicion: false,

      formData: this.getInicialData(),
      formDirty: this.getInicialData(),

      stats: {
        totalProductos: "--",
        precioPromedio: "--",
        precioMin: "--",
        precioMax: "--",
      },

      analytics: {
        baratos: "--",
        medios: "--",
        caros: "--",
      },

      // Saludo
      userName: localStorage.getItem("userName"),
      userRole: localStorage.getItem("role"),
    };
  },

  async mounted() {
    this.productos = await ProductosService.getAll();

    const token = localStorage.getItem("token");

    const stats = await getProductStats(token);
    this.stats = stats;

    const analytics = await getPriceAnalytics(token);
    this.analytics = analytics;
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

    errorStock() {
      let m = "";
      const v = this.formData.stock;

      if (v === null || v === "") m = "Campo requerido";
      else if (v < 0) m = "Debe ser mayor o igual a 0";

      return { mensaje: m, mostrar: m && this.formDirty.stock, ok: !m };
    },

    errorImgUrl() {
      let m = "";
      const v = this.formData.img_url;

      if (!v) m = "Campo requerido";
      else {
        try {
          new URL(v);
        } catch (e) {
          m = "Debe ser una URL válida";
        }
      }

      return { mensaje: m, mostrar: m && this.formDirty.img_url, ok: !m };
    },

    botonDeshabilitado() {
      return (
        !this.errorNombre.ok ||
        !this.errorDescripcion.ok ||
        !this.errorPrecio.ok ||
        !this.errorStock.ok ||
        !this.errorImgUrl.ok
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
        id: null,
        img_url: null,
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
