import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-200">
            <div className="aspect-[16/9] overflow-hidden">
                <Image
                    src={vehicle.imagenUrl}
                    alt={`${vehicle.marca.nombre} ${vehicle.modelo}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <Text variant="p" className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                            {vehicle.marca.nombre}
                        </Text>
                        <Text variant="h3" className="text-xl font-bold text-zinc-900 mt-1">
                            {vehicle.modelo}
                        </Text>
                    </div>
                    <Text variant="span" className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-900">
                        {vehicle.anio}
                    </Text>
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-600 mb-6">
                    <div className="flex items-center gap-1">

                        {vehicle.transmision?.tipo || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1">

                        {vehicle.combustible?.tipo || 'N/A'}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="text-2xl font-bold text-zinc-900">
                        ${vehicle.precio.toLocaleString()}
                    </div>
                    <Link to={`/vehiculo/${vehicle.id}`} className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Ver Detalles
                    </Link>
                </div>
            </div >
        </div >
    );
};

export default VehicleCard;
