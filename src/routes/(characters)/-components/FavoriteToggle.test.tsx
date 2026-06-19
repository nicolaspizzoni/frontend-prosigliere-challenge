import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppStore } from "@lib/hooks/useAppStore";
import { FavoriteToggle } from "./FavoriteToggle";

describe("FavoriteToggle", () => {
  beforeEach(() => {
    useAppStore.setState({ favoriteCharacterIds: [] });
  });

  it("shows add label when the character is not favorited", () => {
    render(<FavoriteToggle characterId="1" name="Harry Potter" />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button")).toHaveAccessibleName("Add Harry Potter to favorites");
  });

  it("toggles favorite state when clicked", async () => {
    render(<FavoriteToggle characterId="1" name="Harry Potter" />);

    await userEvent.click(screen.getByRole("button"));

    expect(useAppStore.getState().isFavorite("1")).toBe(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button")).toHaveAccessibleName("Remove Harry Potter from favorites");
  });
});
