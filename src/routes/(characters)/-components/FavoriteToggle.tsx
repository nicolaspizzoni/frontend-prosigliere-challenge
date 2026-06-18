import { Star } from "lucide-react";
import { cn } from "@lib/utils";
import { useAppStore } from "@lib/hooks/useAppStore";

type FavoriteToggleProps = {
  characterId: string;
  name?: string;
};

export const FavoriteToggle = ({ characterId, name }: FavoriteToggleProps) => {
  const isFavorite = useAppStore((state) => state.isFavorite(characterId));
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const displayName = name ?? "character";

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? `Remove ${displayName} from favorites` : `Add ${displayName} to favorites`
      }
      onClick={() => toggleFavorite(characterId)}
      className={cn(
        "absolute top-0 right-0 z-10 px-[18px] py-[15px] outline-none",
        "focus-visible:ring-2 focus-visible:ring-yellow-600/50"
      )}
    >
      <Star
        aria-hidden
        className={cn(
          "size-5",
          isFavorite ? "fill-gold text-gold-light" : "text-gold-muted"
        )}
      />
    </button>
  );
};
