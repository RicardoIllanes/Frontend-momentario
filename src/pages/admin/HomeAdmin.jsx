import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, link, color }) => (
    <Link to={link} className="block group">
        <div className={`p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    </Link>
);

const HomeAdmin = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
                <p className="text-gray-500 mb-8">Gestiona el inventario y configuración de la automotora.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard
                        title="Vehículos"
                        description="Gestionar inventario, precios y características de los vehículos."
                        link="/admin/vehiculos"
                    />
                    <DashboardCard
                        title="Marcas"
                        description="Administrar las marcas y fabricantes disponibles."
                        link="/admin/marcas"
                    />
                    <DashboardCard
                        title="Concesionarios"
                        description="Gestionar sucursales y puntos de venta."
                        link="/admin/concesionarios"
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;