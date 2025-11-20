import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/concesionarios';

class ConcesionariosService {
    async getAllConcesionarios() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching concesionarios:', error);
            throw error;
        }
    }

    async getConcesionarioById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching concesionario ${id}:`, error);
            throw error;
        }
    }

    async createConcesionario(concesionario) {
        try {
            const response = await axios.post(BASE_URL, concesionario);
            return response.data;
        } catch (error) {
            console.error('Error creating concesionario:', error);
            throw error;
        }
    }

    async updateConcesionario(id, concesionario) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, concesionario);
            return response.data;
        } catch (error) {
            console.error(`Error updating concesionario ${id}:`, error);
            throw error;
        }
    }

    async deleteConcesionario(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting concesionario ${id}:`, error);
            throw error;
        }
    }
}

export default new ConcesionariosService();
