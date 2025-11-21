import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/roles';

const RolesService = {
    async getAllRoles() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    },

    async getRoleById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching role ${id}:`, error);
            throw error;
        }
    }
};

export default RolesService;
