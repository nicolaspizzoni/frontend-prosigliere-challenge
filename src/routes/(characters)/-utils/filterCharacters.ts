import { Character } from "@lib/constants/characters";
import { CharacterFilterType } from "@lib/constants/filters";

export function filterCharactersByTab(
  characters: Character[],
  tab: CharacterFilterType,
  favoriteCharacterIds: string[]
): Character[] {
  switch (tab) {
    case "all":
      return characters;
    case "students":
      return characters.filter((character) => character.hogwartsStudent);
    case "staff":
      return characters.filter((character) => character.hogwartsStaff);
    case "favorite":
      return characters.filter((character) => favoriteCharacterIds.includes(character.id));
    default:
      return characters;
  }
}
