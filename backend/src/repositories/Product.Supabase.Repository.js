import SupabaseConnection from '../databases/supabase.cnx.js';
import ProductModelSupabase from '../models/Product.Supabase.js';

export default class ProductRepositorySupabase {
  constructor() {
    this.supabase = SupabaseConnection.getConnection();
    this.table = 'products';
  }

  // Obtener todos
  async getAll() {
    const { data, error } = await this.supabase.from(this.table).select('*');

    if (error) throw error;
    return data;
  }

  // Crear
  async create(producto) {
    const nuevo = new ProductModelSupabase(
      crypto.randomUUID(),
      producto.nombre,
      producto.precio,
      producto.descripcion,
      producto.stock,
      producto.img_url,
    );

    const { data, error } = await this.supabase.from(this.table).insert([nuevo]).select();

    if (error) throw error;
    return data[0];
  }

  // Actualizar
  async update(producto) {
    const { data, error } = await this.supabase
      .from(this.table)
      .update({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        stock: producto.stock,
        img_url: producto.img_url,
      })
      .eq('id', producto.id)
      .select();

    if (error) throw error;
    return data[0];
  }

  // Borrar
  async delete(id) {
    const { data, error } = await this.supabase.from(this.table).delete().eq('id', id);

    if (error) throw error;
    return data;
  }

  // Buscar por ID
  async getById(id) {
    const { data, error } = await this.supabase.from(this.table).select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  }
}
