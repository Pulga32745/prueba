export default class ProductModelSupabase {
  constructor(id, nombre, precio, descripcion, stock, img_url) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.stock = stock;
    this.img_url = img_url;
  }
}
