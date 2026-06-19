import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  favoriteCharacterIds: string[];
  toggleFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // House selection lives in the URL; only persist favorites
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
      // Persist only serializable state; actions are omitted
      partialize: (state) => ({
        favoriteCharacterIds: state.favoriteCharacterIds,
      }),
    }
  )
);
