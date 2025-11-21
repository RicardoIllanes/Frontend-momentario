import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/estados-reserva';

class EstadosReservaService {
    async getAllEstadosReserva() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching estados de reserva:', error);
            throw error;
        }
    }

    async getEstadoReservaById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching estado de reserva ${id}:`, error);
            throw error;
        }
    }

    async getEstadoReservaByEstado(estado) {
        try {
            const response = await axios.get(`${BASE_URL}/estado`, {
                params: { estado }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching estado de reserva by estado "${estado}":`, error);
            throw error;
        }
    }
}

export default new EstadosReservaService();
