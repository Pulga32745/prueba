import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

export default {
  async register(data) {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  },

  async login(data) {
    const res = await axios.post(`${API_URL}/login`, data);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  },

  getToken() {
    return localStorage.getItem("accessToken");
  }
};
