import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReservasService from '../services/ReservasService';
import { generarMensaje } from '../utils/GenerarMensaje';

const ReservaModal = ({ vehiculo, isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [loading, setLoading] = useState(false);

    // La fecha de reserva es siempre hoy
    const fechaReservaHoy = new Date().toISOString().split('T')[0];
    const precioReserva = 100000;

    // Si el usuario no está autenticado, cerrar el modal y redirigir
    useEffect(() => {
        if (isOpen && !user) {
            onClose();
            navigate('/login');
        }
    }, [isOpen, user, navigate, onClose]);

    // Reset form cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setFechaEntrega('');
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que se haya seleccionado fecha de entrega
        if (!fechaEntrega) {
            generarMensaje('Por favor seleccione la fecha de entrega', 'warning');
            return;
        }

        const entregaDate = new Date(fechaEntrega);
        const reservaDate = new Date(fechaReservaHoy);

        // Validar que fecha de entrega sea posterior a hoy
        if (entregaDate <= reservaDate) {
            generarMensaje('La fecha de entrega debe ser posterior a la fecha de hoy', 'error');
            return;
        }

        setLoading(true);

        try {
            const reservaData = {
                usuario: { id: user.id },
                vehiculo: { id: vehiculo.id },
                estado: { id: 1 }, // Pendiente por defecto
                fechaReserva: new Date(fechaReservaHoy).toISOString(),
                fechaEntrega: new Date(fechaEntrega).toISOString(),
                precioReserva: precioReserva
            };

            await ReservasService.createReserva(reservaData);
            generarMensaje('¡Reserva creada exitosamente!', 'success');

            setTimeout(() => {
                onClose();
                navigate('/mis-reservas');
            }, 1500);

        } catch (error) {
            console.error('Error creating reserva:', error);
            const errorMsg = error.response?.data?.message || 'Error al crear la reserva. Intente nuevamente.';
            generarMensaje(errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-zinc-900">Reservar Vehículo</h3>
                        <p className="text-sm text-zinc-500 mt-1">
                            {vehiculo.marca.nombre} {vehiculo.modelo} ({vehiculo.anio})
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        disabled={loading}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <img
                        src={vehiculo.imagenUrl}
                        alt={`${vehiculo.marca.nombre} ${vehiculo.modelo}`}
                        className="w-full h-40 object-cover rounded-xl"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fechaReserva" className="block text-sm font-medium text-zinc-700 mb-2">
                            Fecha de Reserva
                        </label>
                        <input
                            type="date"
                            id="fechaReserva"
                            value={fechaReservaHoy}
                            readOnly
                            disabled
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg bg-zinc-100 text-zinc-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="fechaEntrega" className="block text-sm font-medium text-zinc-700 mb-2">
                            Fecha de Entrega *
                        </label>
                        <input
                            type="date"
                            id="fechaEntrega"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Mínimo mañana
                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            required
                            disabled={loading}
                        />
                        <p className="text-xs text-zinc-500 mt-1">Seleccione cuando desea retirar el vehículo</p>
                    </div>

                    <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-zinc-600">Precio de Reserva:</span>
                            <span className="text-2xl font-bold text-zinc-900">${precioReserva.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-zinc-300 text-zinc-700 rounded-lg font-medium hover:bg-zinc-50 transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Confirmar Reserva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservaModal;
