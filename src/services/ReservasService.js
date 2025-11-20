import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/reservas';

class ReservasService {
    async getAllReservas() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching reservas:', error);
            throw error;
        }
    }

    async getReservaById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching reserva ${id}:`, error);
            throw error;
        }
    }

    async createReserva(reserva) {
        try {
            const response = await axios.post(BASE_URL, reserva);
            return response.data;
        } catch (error) {
            console.error('Error creating reserva:', error);
            throw error;
        }
    }

    async updateReserva(id, reserva) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, reserva);
            return response.data;
        } catch (error) {
            console.error(`Error updating reserva ${id}:`, error);
            throw error;
        }
    }

    async deleteReserva(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting reserva ${id}:`, error);
            throw error;
        }
    }
}

export default new ReservasService();
