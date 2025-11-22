import React from "react";
import { render, screen } from "@testing-library/react";
import VehicleCard from "../components/molecules/VehicleCard.jsx";
import { MemoryRouter } from "react-router-dom";

describe("VehicleCard", () => {

    const mockVehicle = {
        id: 1,
        imagenUrl: "https://example.com/auto.jpg",
        marca: { nombre: "Toyota" },
        modelo: "Corolla",
        anio: 2020,
        precio: 15000000,
        transmision: { tipo: "Automática" },
        combustible: { tipo: "Gasolina" }
    };

    it("muestra marca, modelo y año", () => {
        render(
            <MemoryRouter>
                <VehicleCard vehicle={mockVehicle} />
            </MemoryRouter>
        );

        expect(screen.getByText("Toyota")).toBeTruthy();
        expect(screen.getByText("Corolla")).toBeTruthy();
        expect(screen.getByText("2020")).toBeTruthy();
    });

    it("muestra transmisión y combustible", () => {
        render(
            <MemoryRouter>
                <VehicleCard vehicle={mockVehicle} />
            </MemoryRouter>
        );

        expect(screen.getByText("Automática")).toBeTruthy();
        expect(screen.getByText("Gasolina")).toBeTruthy();
    });

    it("incluye el enlace correcto al detalle", () => {
        render(
            <MemoryRouter>
                <VehicleCard vehicle={mockVehicle} />
            </MemoryRouter>
        );

        const link = screen.getByText("Ver Detalles").closest("a");
        expect(link.getAttribute("href")).toBe("/vehiculo/1");
    });

});
