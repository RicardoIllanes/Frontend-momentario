import React, { useState, useEffect } from 'react';
import VehiculosService from '../../../services/VehiculosService';

const VehiculosList = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVehiculos();
    }, []);

    const loadVehiculos = async () => {
        try {
            const data = await VehiculosService.getAllVehiculos();
            setVehiculos(data);
        } catch (error) {
            console.error('Error loading vehiculos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este vehículo?')) {
            try {
                await VehiculosService.deleteVehiculo(id);
                loadVehiculos();
            } catch (error) {
                console.error('Error deleting vehiculo:', error);
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Vehículos</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Nuevo Vehículo
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Modelo</th>
                            <th className="p-4 font-semibold text-gray-600">Marca</th>
                            <th className="p-4 font-semibold text-gray-600">Año</th>
                            <th className="p-4 font-semibold text-gray-600">Precio</th>
                            <th className="p-4 font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vehiculos.map((vehiculo) => (
                            <tr key={vehiculo.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500">#{vehiculo.id}</td>
                                <td className="p-4 font-medium text-gray-900">{vehiculo.modelo}</td>
                                <td className="p-4 text-gray-600">{vehiculo.marca?.nombre}</td>
                                <td className="p-4 text-gray-600">{vehiculo.anio}</td>
                                <td className="p-4 text-gray-600">${vehiculo.precio.toLocaleString()}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(vehiculo.id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehiculosList;
