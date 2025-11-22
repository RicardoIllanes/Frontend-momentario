import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CardsDisplay from "../../components/organisms/CardsDisplay.jsx";

const mockContent = [
  {
    img: "https://example.com/image1.jpg",
    card: [
      { type: "text", content: "Texto 1" },
      { type: "text", content: "Texto 2" },
    ],
  },
  {
    img: "https://example.com/image2.jpg",
    card: [
      { type: "text", content: "Texto A" },
      { type: "text", content: "Texto B" },
    ],
  },
];

describe("CardsDisplay organism", () => {
  it("renderiza correctamente los textos dentro de content.card", () => {
    render(<CardsDisplay content={mockContent} />);

    expect(screen.getByText("Texto 1")).toBeInTheDocument();
    expect(screen.getByText("Texto 2")).toBeInTheDocument();
    expect(screen.getByText("Texto A")).toBeInTheDocument();
    expect(screen.getByText("Texto B")).toBeInTheDocument();
  });

  it("usa layout de lista cuando isCardList = true", () => {
    const { container } = render(
      <CardsDisplay content={mockContent} isCardList />
    );

    const listMode = container.querySelector(".flex.flex-col");
    expect(listMode).not.toBeNull();
  });
});
