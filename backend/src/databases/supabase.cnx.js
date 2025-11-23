import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config.js';

let supabase = null;

class SupaBaseConnection {
  static getConnection() {
    if (!supabase) {
      supabase = createClient(
        config.SUPABASE_URL,
        config.SUPABASE_API_KEY
      );
      console.log('Supabase connected');
    }
    return supabase;
  }
}

export default SupaBaseConnection;
