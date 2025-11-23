import api from "./api";

class AuthService {
  async register(datos) {
    const { data } = await api.post("/v1/auth/register", datos);
    return data;
  }

  async login(datos) {
    const { data } = await api.post("/v1/auth/login", datos);
    return data;
  }
}

export default new AuthService();
