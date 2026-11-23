import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StarRating } from "./StarRating";

describe("StarRating", () => {
  it("renders the correct aria-label for the rating", () => {
    render(<StarRating rating={4.5} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "4.5 out of 5 stars"
    );
  });

  it("displays review count when provided", () => {
    render(<StarRating rating={4.0} reviewCount={120} />);
    expect(screen.getByText("(120)")).toBeInTheDocument();
  });

  it("does not display review count when not provided", () => {
    render(<StarRating rating={3.5} />);
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });
});
