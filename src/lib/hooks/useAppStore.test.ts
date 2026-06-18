import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      preferredHouse: undefined,
      favoriteCharacterIds: [],
    });
  });

  describe("setPreferredHouse", () => {
    it("sets a specific house", () => {
      useAppStore.getState().setPreferredHouse("Gryffindor");
      expect(useAppStore.getState().preferredHouse).toBe("Gryffindor");
    });

    it("sets null to show all characters", () => {
      useAppStore.getState().setPreferredHouse(null);
      expect(useAppStore.getState().preferredHouse).toBeNull();
    });

    it("sets undefined to trigger house selection", () => {
      useAppStore.getState().setPreferredHouse("Slytherin");
      useAppStore.getState().setPreferredHouse(undefined);
      expect(useAppStore.getState().preferredHouse).toBeUndefined();
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
