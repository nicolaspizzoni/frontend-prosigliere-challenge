import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HouseType } from "@lib/constants/houses";

interface AppState {
  preferredHouse: HouseType | null | undefined;
  setPreferredHouse: (house: HouseType | null | undefined) => void;
  favoriteCharacterIds: string[];
  toggleFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      preferredHouse: undefined,
      setPreferredHouse: (preferredHouse) => set(() => ({ preferredHouse })),
      favoriteCharacterIds: [],
      toggleFavorite: (characterId) =>
        set((state) => {
          const isCurrentlyFavorite = state.favoriteCharacterIds.includes(characterId);
          return {
            favoriteCharacterIds: isCurrentlyFavorite
              ? state.favoriteCharacterIds.filter((id) => id !== characterId)
              : [...state.favoriteCharacterIds, characterId],
          };
        }),
      isFavorite: (characterId) => get().favoriteCharacterIds.includes(characterId),
    }),
    {
      name: "the-harry-potter-app-storage",
    }
  )
);
