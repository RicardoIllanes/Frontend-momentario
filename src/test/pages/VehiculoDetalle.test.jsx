import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import VehiculoDetalle from "../../pages/user/VehiculoDetalle.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
import VehiculosService from "../../services/VehiculosService.js";

vi.mock("../../services/VehiculosService.js", () => ({
  default: {
    getVehiculoById: vi.fn(),
  },
}));

describe("VehiculoDetalle page", () => {
  it("muestra datos de la API", async () => {
    VehiculosService.getVehiculoById.mockResolvedValue({
      id: 10,
      marca: { nombre: "Mazda" },
      modelo: "3",
      anio: 2021,
      imagenUrl: "",
      combustible: { tipo: "Gasolina" },
      transmision: { tipo: "Automática" },
      precio: 17000000,
    });

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
      expect(screen.getByText(/Mazda 3/i)).toBeInTheDocument();
    });
  });
});
