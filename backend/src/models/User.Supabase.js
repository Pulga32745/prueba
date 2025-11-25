import SupaBaseConnection from '../databases/supabase.cnx.js';
const supabase = SupaBaseConnection.getConnection();

export class UserModelSupabase {
  static async create(user) {
    const { data, error } = await supabase.from('users').insert(user).select().single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from('users').select('*');

    if (error) throw new Error(error.message);
    return data;
  }

  static async getByEmail(email) {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

    if (error) return null;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

    if (error) return null;
    return data;
  }

  static async deleteById(id) {
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }

  static async updateById(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
