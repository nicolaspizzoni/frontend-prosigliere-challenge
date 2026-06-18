import { cn } from "@lib/utils";
import { Character } from "@lib/constants/characters";
import { Link } from "@tanstack/react-router";
import { FavoriteToggle } from "./FavoriteToggle";

type CharacterCardProps = {
  character: Character;
  className?: string;
};

export const CharacterCard = ({ character, className }: CharacterCardProps) => {
  return (
    <div className="relative">
      <Link to="/character/$characterId" params={{ characterId: character.id }}>
        <article
          className={cn(
            "relative isolate flex h-87.5 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl px-3 py-6 shadow-md shadow-zinc-950",
            className
          )}
        >
          <img
            src={character.image || undefined}
            alt={character.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-stone-900/20"></div>
          <h3 className="z-10 font-light tracking-wide">{character.name}</h3>
        </article>
      </Link>
      <FavoriteToggle characterId={character.id} name={character.name} />
    </div>
  );
};
