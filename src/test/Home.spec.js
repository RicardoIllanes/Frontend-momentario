import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/user/Home.jsx";
import VehiculosService from "../services/VehiculosService.js";

describe("Home.jsx", () => {

    beforeEach(() => {
        spyOn(console, "error");
    });

    it("muestra spinner mientras loading es true", () => {
        spyOn(VehiculosService, "getAllVehiculos").and.returnValue(new Promise(() => { }));

        const { container } = render(<Home />);

        const spinner = container.querySelector(".animate-spin");
        expect(spinner).toBeTruthy();
    });

});
