import axios from "axios";

const API_URL = "https://automotora-backend.onrender.com/api/v1";

class CatalogosService {
    async getAllTransmisiones() {
        return axios.get(`${API_URL}/transmisiones`).then(res => res.data);
    }

    async getAllCombustibles() {
        return axios.get(`${API_URL}/combustibles`).then(res => res.data);
    }

    async getAllRegiones() {
        return axios.get(`${API_URL}/regiones`).then(res => res.data);
    }

    async getAllComunas() {
        return axios.get(`${API_URL}/comunas`).then(res => res.data);
    }

    async getComunasByRegion(regionId) {
        return axios.get(`${API_URL}/comunas/region/${regionId}`).then(res => res.data);
    }
}

// 👇 ESTO ES LO IMPORTANTE
export default new CatalogosService();

