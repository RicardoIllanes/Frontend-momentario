import React, { useState, useEffect } from 'react';
import UsuarioService from '../../../services/UsuarioService';
import CreateModal from '../../../components/organisms/CreateModal';

const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre", required: true },
    { name: "rut", type: "text", placeholder: "RUT", required: true },
    { name: "correo", type: "email", placeholder: "Correo", required: true },
    { name: "rolId", type: "text", placeholder: "ID Rol", required: true },
];

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState(null);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const data = await UsuarioService.getAllUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error('Error loading usuarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (formData) => {
        setSubmitLoading(true);
        try {
            const payload = {
                nombre: formData.nombre,
                rut: formData.rut,
                correo: formData.correo,
                rol: { id: parseInt(formData.rolId) }
            };

            await UsuarioService.updateUsuario(editingUsuario.id, payload);
            await loadUsuarios();
            setIsModalOpen(false);
            setEditingUsuario(null);
        } catch (error) {
            console.error('Error saving usuario:', error);
            alert('Error al guardar el usuario');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenEdit = (usuario) => {
        const rolId = typeof usuario.rol === 'object' ? usuario.rol?.id : usuario.rol;
        setEditingUsuario({
            ...usuario,
            rolId: rolId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await UsuarioService.deleteUsuario(id);
            loadUsuarios();
        } catch (error) {
            console.error('Error deleting usuario:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando...</div>;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Nombre</th>
                            <th className="p-4 font-semibold text-gray-600">RUT</th>
                            <th className="p-4 font-semibold text-gray-600">Correo</th>
                            <th className="p-4 font-semibold text-gray-600">Rol</th>
                            <th className="p-4 font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500">#{usuario.id}</td>
                                <td className="p-4 font-medium text-gray-900">{usuario.nombre}</td>
                                <td className="p-4 text-gray-600">{usuario.rut}</td>
                                <td className="p-4 text-gray-600">{usuario.correo}</td>
                                <td className="p-4 text-gray-600">{usuario.rol?.nombre || usuario.rol}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(usuario)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(usuario.id)}
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

            {editingUsuario && (
                <CreateModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingUsuario(null);
                    }}
                    onSubmit={handleUpdate}
                    inputsConfig={createInputs}
                    title="Editar Usuario"
                    submitText="Actualizar"
                    loading={submitLoading}
                    initialData={editingUsuario}
                />
            )}
        </div>
    );
};

export default UsuariosList;
