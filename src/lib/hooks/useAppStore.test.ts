import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      favoriteCharacterIds: [],
    });
  });

  describe("toggleFavorite", () => {
    it("adds a character id when not favorited", () => {
      useAppStore.getState().toggleFavorite("char-1");
      expect(useAppStore.getState().favoriteCharacterIds).toEqual(["char-1"]);
      expect(useAppStore.getState().isFavorite("char-1")).toBe(true);
    });

    it("removes a character id when already favorited", () => {
      useAppStore.getState().toggleFavorite("char-1");
      useAppStore.getState().toggleFavorite("char-1");
      expect(useAppStore.getState().favoriteCharacterIds).toEqual([]);
      expect(useAppStore.getState().isFavorite("char-1")).toBe(false);
    });

    it("is idempotent when toggling add then remove", () => {
      const { toggleFavorite } = useAppStore.getState();
      toggleFavorite("char-1");
      toggleFavorite("char-2");
      expect(useAppStore.getState().favoriteCharacterIds).toEqual(["char-1", "char-2"]);

      toggleFavorite("char-1");
      expect(useAppStore.getState().favoriteCharacterIds).toEqual(["char-2"]);

      toggleFavorite("char-2");
      expect(useAppStore.getState().favoriteCharacterIds).toEqual([]);
    });
  });
});
