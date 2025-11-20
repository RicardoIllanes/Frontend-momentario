import React, { useState, useEffect } from 'react';
import ConcesionariosService from '../../../services/ConcesionariosService';

const ConcesionariosList = () => {
    const [concesionarios, setConcesionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadConcesionarios();
    }, []);

    const loadConcesionarios = async () => {
        try {
            const data = await ConcesionariosService.getAllConcesionarios();
            setConcesionarios(data);
        } catch (error) {
            console.error('Error loading concesionarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este concesionario?')) {
            try {
                await ConcesionariosService.deleteConcesionario(id);
                loadConcesionarios();
            } catch (error) {
                console.error('Error deleting concesionario:', error);
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Concesionarios</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Nuevo Concesionario
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Nombre</th>
                            <th className="p-4 font-semibold text-gray-600">Dirección</th>
                            <th className="p-4 font-semibold text-gray-600">Comuna</th>
                            <th className="p-4 font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {concesionarios.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500">#{c.id}</td>
                                <td className="p-4 font-medium text-gray-900">{c.nombre}</td>
                                <td className="p-4 text-gray-600">{c.direccion}</td>
                                <td className="p-4 text-gray-600">{c.comuna?.nombre}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
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

export default ConcesionariosList;
