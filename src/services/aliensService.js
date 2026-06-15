import { api } from "./apiService";

export const aliensService = {
  async listarAliens(token) {
    return api.request("/aliens", "GET", token);
  },

  async criarAlien(dados, token) {
    return api.request("/aliens", "POST", token, dados);
  },

  async atualizarAlien(id, dados, token) {
    return api.request(`/aliens/${id}`, "PUT", token, dados);
  },

  async deletarAlien(id, token) {
    return api.request(`/aliens/${id}`, "DELETE", token);
  },
};
