import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PriceTag } from "./PriceTag";

describe("PriceTag", () => {
  it("renders formatted price", () => {
    render(<PriceTag amount={4200} />);
    expect(screen.getByText("₹4,200")).toBeInTheDocument();
  });

  it("renders period text", () => {
    render(<PriceTag amount={199} period="night" />);
    expect(screen.getByText("/ night")).toBeInTheDocument();
  });

  it("supports custom period", () => {
    render(<PriceTag amount={999} period="week" />);
    expect(screen.getByText("/ week")).toBeInTheDocument();
  });
});
