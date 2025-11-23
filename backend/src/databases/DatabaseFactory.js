// src/databases/DatabaseFactory.js
import SupaBaseConnection from "./supabase.cnx.js";

class DatabaseFactory {
  static getConnection() {
    return SupaBaseConnection.getConnection();  // ✔ coincide con el archivo real
  }
}

export default DatabaseFactory;
