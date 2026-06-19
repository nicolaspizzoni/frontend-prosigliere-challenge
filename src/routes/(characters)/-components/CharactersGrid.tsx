import { Spinner } from "@lib/components/Spinner";
import { CharacterCard } from "./CharacterCard";
import { useCharacters } from "../-hooks/useCharacters";
import { CharacterFilterType } from "@lib/constants/filters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { filterCharactersByTab } from "../-utils/filterCharacters";
import { HouseSlug, HouseType } from "@lib/constants/houses";

const EMPTY_FILTER_MESSAGES: Record<CharacterFilterType, string> = {
  all: "No characters found.",
  students: "No students found.",
  staff: "No staff found.",
  favorite: "No favorite characters yet",
};

// Receives house from the route instead of global store; passes houseSlug to character card to builddetail links
export const CharactersGrid = ({
  filter = "all",
  house,
  houseSlug,
}: {
  filter: CharacterFilterType;
  house: HouseType | null;
  houseSlug: HouseSlug;
}) => {
  const { characters, isLoading, isError } = useCharacters(house);
  const favoriteCharacterIds = useAppStore((state) => state.favoriteCharacterIds);

  const filteredCharacters = filterCharactersByTab(characters, filter, favoriteCharacterIds);

  if (isLoading) {
    return (
      // role="status" + aria-live="polite" announces loading without stealing focus
      <div
        role="status"
        aria-live="polite"
        aria-busy={isLoading}
        className="flex justify-center py-20"
      >
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      // role="alert" + aria-live="assertive" for errors that need immediate attention
      <div
        role="alert"
        aria-live="assertive"
        className="flex flex-col items-center gap-4 py-20 text-center"
      >
        <p className="text-lg text-amber-200/60">Something went wrong while fetching characters.</p>
        <p className="text-sm text-amber-200/30">Please try again later.</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="text-lg text-amber-200/60">No characters found.</p>
        <p className="text-sm text-amber-200/30">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  if (filteredCharacters.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="text-lg text-amber-200/60">{EMPTY_FILTER_MESSAGES[filter]}</p>
      </div>
    );
  }

  // mb-7 to match the design mockup
  return (
    <div className="container mx-auto mb-7 grid w-min grid-cols-[repeat(auto-fill,minmax(200px,max-content))] gap-4">
      {filteredCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          houseSlug={houseSlug}
          wrapperClassName="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />
      ))}
    </div>
  );
};
