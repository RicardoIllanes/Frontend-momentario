import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import VehiculosService from '../../services/VehiculosService';

vi.mock('axios');

describe('VehiculosService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getAllVehiculos retorna vehículos mapeados', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, imagen: 'img1.jpg' },
        { id: 2, imagen: null }
      ]
    });

    const results = await VehiculosService.getAllVehiculos();
    expect(results.length).toBe(2);
    expect(results[0].imagenUrl).toContain('img1.jpg');
  });

  it('deleteVehiculo elimina vehículo', async () => {
    axios.delete.mockResolvedValue({ status: 200 });
    const ok = await VehiculosService.deleteVehiculo(5);

    expect(ok).toBe(true);
    expect(axios.delete).toHaveBeenCalled();
  });
});
