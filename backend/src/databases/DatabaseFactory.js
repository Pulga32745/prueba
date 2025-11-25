// src/databases/DatabaseFactory.js
import SupaBaseConnection from './supabase.cnx.js';

class DatabaseFactory {
  static getConnection() {
    return SupaBaseConnection.getConnection();
  }
}

export default DatabaseFactory;
