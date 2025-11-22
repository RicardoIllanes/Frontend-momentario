import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import VehiculoDetalle from "../pages/user/VehiculoDetalle.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import VehiculosService from "../services/VehiculosService.js";

describe("VehiculoDetalle", () => {

    beforeEach(() => {
        spyOn(VehiculosService, "getVehiculoById").and.returnValue(
            Promise.resolve({
                id: 10,
                marca: { nombre: "Mazda" },
                modelo: "3",
                anio: 2021,
                descripcion: "Auto test",
                precio: 17000000,
                imagenUrl: "",
                transmision: { tipo: "Automática" },
                combustible: { tipo: "Gasolina" },
                concesionario: {
                    nombre: "Concesionario Test",
                    direccion: "Av Siempre Viva 123",
                    comuna: { nombre: "Santiago", region: { nombre: "RM" } },
                    telefono: "123456789",
                    correo: "test@test.com"
                }
            })
        );
    });

    it("carga y muestra los datos del vehículo", async () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={["/vehiculo/10"]}>
                    <Routes>
                        <Route path="/vehiculo/:id" element={<VehiculoDetalle />} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Mazda")).toBeTruthy();
            expect(screen.getByText("3")).toBeTruthy();
            expect(screen.getByText((content) => content.includes("17.000.000"))).toBeTruthy();

        });
    });

    it("muestra datos del concesionario", async () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={["/vehiculo/10"]}>
                    <Routes>
                        <Route path="/vehiculo/:id" element={<VehiculoDetalle />} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        await waitFor(() => {
            const textos = screen.getAllByText("Concesionario Test");
            expect(textos.length).toBe(2);

            expect(screen.getByText("Av Siempre Viva 123")).toBeTruthy();
            expect(screen.getByText("123456789")).toBeTruthy();
            expect(screen.getByText("test@test.com")).toBeTruthy();
        });
    });

});
