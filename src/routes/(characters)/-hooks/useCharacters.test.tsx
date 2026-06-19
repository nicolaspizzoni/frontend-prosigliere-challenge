import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { fetchCharacters } from "@lib/api/characters";
import { mockCharacters } from "../../../test/mocks";
import { useCharacters } from "./useCharacters";

vi.mock("@lib/api/characters", () => ({
  fetchCharacters: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useCharacters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters out characters without an image", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue(mockCharacters);

    const { result } = renderHook(() => useCharacters("Gryffindor"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters).toHaveLength(3);
    expect(result.current.characters.every((character) => character.image)).toBe(true);
  });

  it("passes the house to fetchCharacters", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue([]);

    renderHook(() => useCharacters("Slytherin"), { wrapper: createWrapper() });

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledWith("Slytherin"));
  });
});
