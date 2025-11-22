import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehicleCard from '../../components/molecules/VehicleCard.jsx';

const mockVehicle = {
    id: 10,
    imagenUrl: 'https://example.com/auto.jpg',
    marca: { nombre: 'Toyota' },
    modelo: 'Corolla',
    anio: 2021,
    precio: 15000000,
    kilometraje: 12000,
    transmision: { tipo: 'Automática' },
    combustible: { tipo: 'Gasolina' },
};

describe('VehicleCard component', () => {
    it('renderiza los datos principales del vehículo', () => {
        render(
            <MemoryRouter>
                <VehicleCard vehicle={mockVehicle} />
            </MemoryRouter>
        );
        expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
        expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
        expect(screen.getByText(/2021/i)).toBeInTheDocument();
        expect(screen.getByText(/Automática/i)).toBeInTheDocument();
        expect(screen.getByText(/Gasolina/i)).toBeInTheDocument();
    });

    it('incluye un enlace al detalle del vehículo', () => {
        render(
            <MemoryRouter>
                <VehicleCard vehicle={mockVehicle} />
            </MemoryRouter>
        );

        const link = screen.getByText(/Ver Detalles/i).closest('a');
        expect(link).toHaveAttribute('href', '/vehiculo/10');
    });
});
