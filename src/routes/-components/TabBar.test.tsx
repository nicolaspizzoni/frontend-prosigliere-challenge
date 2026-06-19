import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBar } from "./TabBar";

describe("TabBar", () => {
  it("calls onChange when a tab is clicked", async () => {
    const onChange = vi.fn();

    render(<TabBar value="all" onChange={onChange} />);

    await userEvent.click(screen.getByRole("tab", { name: "Students" }));
    expect(onChange).toHaveBeenCalledWith("students");
  });

  it("marks the active tab with aria-selected", () => {
    render(<TabBar value="staff" onChange={vi.fn()} />);

    expect(screen.getByRole("tab", { name: "Staff" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "All Characters" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("moves to the next tab on ArrowRight", () => {
    const onChange = vi.fn();

    render(<TabBar value="all" onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("students");
  });

  it("moves to the previous tab on ArrowLeft", () => {
    const onChange = vi.fn();

    render(<TabBar value="students" onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith("all");
  });
});
