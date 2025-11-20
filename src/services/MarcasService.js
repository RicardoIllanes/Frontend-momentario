import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/marcas';

class MarcasService {
    async getAllMarcas() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching marcas:', error);
            throw error;
        }
    }

    async getMarcaById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching marca ${id}:`, error);
            throw error;
        }
    }

    async createMarca(marca) {
        try {
            const response = await axios.post(BASE_URL, marca);
            return response.data;
        } catch (error) {
            console.error('Error creating marca:', error);
            throw error;
        }
    }

    async updateMarca(id, marca) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, marca);
            return response.data;
        } catch (error) {
            console.error(`Error updating marca ${id}:`, error);
            throw error;
        }
    }

    async deleteMarca(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting marca ${id}:`, error);
            throw error;
        }
    }
}

export default new MarcasService();
