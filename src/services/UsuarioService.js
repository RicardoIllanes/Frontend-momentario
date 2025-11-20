import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/usuarios';

class UsuarioService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUsuario(usuario) {
        return axios.post(`${BASE_URL}`, usuario);
    }

    getAllUsuarios() {
        return axios.get(BASE_URL);
    }

    getUsuarioById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    updateUsuario(id, usuario) {
        return axios.put(`${BASE_URL}/${id}`, usuario);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new UsuarioService();
