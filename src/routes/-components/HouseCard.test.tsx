import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HouseCard } from "./HouseCard";

describe("HouseCard", () => {
  it("calls onClick with the house when clicked", async () => {
    const onClick = vi.fn();

    render(<HouseCard house="Gryffindor" onClick={onClick} />);

    await userEvent.click(screen.getByRole("button", { name: "Select Gryffindor" }));
    expect(onClick).toHaveBeenCalledWith("Gryffindor");
  });

  it("renders the house image", () => {
    render(<HouseCard house="Slytherin" onClick={vi.fn()} />);

    expect(screen.getByRole("img", { name: "Slytherin" })).toHaveAttribute(
      "src",
      "/houses/Slytherin.png"
    );
  });
});
