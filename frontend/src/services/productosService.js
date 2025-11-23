import api from "./api";

class ProductosService {
  async getAll() {
    const { data } = await api.get("/products/all");
    return data;
  }

  async create(producto) {
    const { data } = await api.post("/products/create", producto);
    return data;
  }

  async update(id, producto) {
    const { data } = await api.put(`/products/${id}`, producto);
    return data;
  }

  async delete(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  }
}

export default new ProductosService();
