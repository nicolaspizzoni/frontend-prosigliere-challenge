import { screen } from "@testing-library/react";
import { useAppStore } from "@lib/hooks/useAppStore";
import { mockCharacters } from "../../../test/mocks";
import { renderWithProviders } from "../../../test/utils";
import { CharactersGrid } from "./CharactersGrid";

vi.mock("../-hooks/useCharacters", () => ({
  useCharacters: vi.fn(),
}));

vi.mock("./CharacterCard", () => ({
  CharacterCard: ({ character }: { character: { name: string } }) => <div>{character.name}</div>,
}));

import { useCharacters } from "../-hooks/useCharacters";

const defaultProps = {
  filter: "all" as const,
  house: "Gryffindor" as const,
  houseSlug: "gryffindor" as const,
};

function mockUseCharacters(overrides: Partial<ReturnType<typeof useCharacters>>) {
  vi.mocked(useCharacters).mockReturnValue({
    characters: [],
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
    ...overrides,
  } as unknown as ReturnType<typeof useCharacters>);
}

describe("CharactersGrid", () => {
  beforeEach(() => {
    useAppStore.setState({ favoriteCharacterIds: [] });
    vi.clearAllMocks();
  });

  it("shows a loading spinner while characters are fetching", () => {
    mockUseCharacters({ isLoading: true });

    renderWithProviders(<CharactersGrid {...defaultProps} />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("shows an error message when fetching fails", () => {
    mockUseCharacters({ isError: true });

    renderWithProviders(<CharactersGrid {...defaultProps} />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong while fetching characters."
    );
  });

  it("shows a generic empty message when the API returns no characters", () => {
    mockUseCharacters({ characters: [] });

    renderWithProviders(<CharactersGrid {...defaultProps} />);

    expect(screen.getByText("No characters found.")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your filters or search query.")).toBeInTheDocument();
  });

  it.each([
    ["students", [mockCharacters[2]], "No students found."],
    ["staff", [mockCharacters[0]], "No staff found."],
    ["favorite", mockCharacters, "No favorite characters yet"],
  ] as const)("shows the correct empty message for the %s tab", (filter, characters, message) => {
    mockUseCharacters({ characters: [...characters] });

    renderWithProviders(<CharactersGrid {...defaultProps} filter={filter} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("renders characters for the active filter", () => {
    mockUseCharacters({ characters: mockCharacters });

    renderWithProviders(<CharactersGrid {...defaultProps} filter="students" />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
    expect(screen.queryByText("Severus Snape")).not.toBeInTheDocument();
  });

  it("renders only favorite characters on the favorite tab", () => {
    useAppStore.setState({ favoriteCharacterIds: ["1"] });
    mockUseCharacters({ characters: mockCharacters });

    renderWithProviders(<CharactersGrid {...defaultProps} filter="favorite" />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("Hermione Granger")).not.toBeInTheDocument();
  });

  it("passes the house prop to useCharacters", () => {
    mockUseCharacters({ characters: mockCharacters });

    renderWithProviders(<CharactersGrid {...defaultProps} house="Slytherin" />);

    expect(useCharacters).toHaveBeenCalledWith("Slytherin");
  });
});
