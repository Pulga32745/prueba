import api from "./api";

class UsuariosService {
  async register(usuario) {
    const { data } = await api.post("/auth/register", usuario);
    return data;
  }

  async login(usuario) {
    const { data } = await api.post("/auth/login", usuario);
    return data;
  }

  async getUserData() {
    const token = localStorage.getItem("token");

    const { data } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data;
  }
}

export default new UsuariosService();
