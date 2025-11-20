import axios from 'axios';

const API_URL = 'https://automotora-backend.onrender.com/api/v1';

class CatalogosService {
    async getAllTransmisiones() {
        try {
            const response = await axios.get(`${API_URL}/transmisiones`);
            return response.data;
        } catch (error) {
            console.error('Error fetching transmisiones:', error);
            return [];
        }
    }

    async getAllCombustibles() {
        try {
            const response = await axios.get(`${API_URL}/combustibles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching combustibles:', error);
            return [];
        }
    }

    async getAllRegiones() {
        try {
            const response = await axios.get(`${API_URL}/regiones`);
            return response.data;
        } catch (error) {
            console.error('Error fetching regiones:', error);
            return [];
        }
    }

    async getAllComunas() {
        try {
            const response = await axios.get(`${API_URL}/comunas`);
            return response.data;
        } catch (error) {
            console.error('Error fetching comunas:', error);
            return [];
        }
    }

    async getComunasByRegion(regionId) {
        try {
            const response = await axios.get(`${API_URL}/comunas/region/${regionId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comunas for region ${regionId}:`, error);
            return [];
        }
    }
}

export default new CatalogosService();
