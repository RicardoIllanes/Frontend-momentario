import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ReservaCard = ({ reserva }) => {
    const navigate = useNavigate();

    const getEstadoBadgeColor = (estado) => {
        const estadoLower = estado?.toLowerCase() || '';
        if (estadoLower.includes('pendiente')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (estadoLower.includes('confirmada') || estadoLower.includes('aprobada')) return 'bg-green-100 text-green-800 border-green-200';
        if (estadoLower.includes('cancelada')) return 'bg-red-100 text-red-800 border-red-200';
        if (estadoLower.includes('completada')) return 'bg-blue-100 text-blue-800 border-blue-200';
        return 'bg-zinc-100 text-zinc-800 border-zinc-200';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-1">
                    <Image
                        src={reserva.vehiculo?.imagenUrl || reserva.vehiculo?.imagen || 'https://via.placeholder.com/300x200'}
                        alt={`${reserva.vehiculo?.marca?.nombre} ${reserva.vehiculo?.modelo}`}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <Text variant="h3" className="text-xl font-bold text-zinc-900">
                                {reserva.vehiculo?.marca?.nombre} {reserva.vehiculo?.modelo}
                            </Text>
                            <Text variant="p" className="text-sm text-zinc-500">Año {reserva.vehiculo?.anio}</Text>
                        </div>
                        <Text variant="span" className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoBadgeColor(reserva.estado?.estado)}`}>
                            {reserva.estado?.estado || 'N/A'}
                        </Text>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Text variant="p" className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Fecha Reserva</Text>
                            <Text variant="p" className="font-semibold text-zinc-900">{formatDate(reserva.fechaReserva)}</Text>
                        </div>
                        <div>
                            <Text variant="p" className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Fecha Entrega</Text>
                            <Text variant="p" className="font-semibold text-zinc-900">{formatDate(reserva.fechaEntrega)}</Text>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
                        <div>
                            <Text variant="p" className="text-xs text-zinc-500 mb-1">Precio de Reserva</Text>
                            <Text variant="p" className="text-2xl font-bold text-zinc-900">
                                ${reserva.precioReserva?.toLocaleString() || '0'}
                            </Text>
                        </div>
                        <Button
                            text="Ver Vehículo"
                            onClick={() => navigate(`/vehiculo/${reserva.vehiculo?.id}`)}
                            className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservaCard;
