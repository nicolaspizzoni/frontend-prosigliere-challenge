import { Character } from "@lib/constants/characters";
import { CharacterFilterType } from "@lib/constants/filters";

export function filterCharactersByTab(
  characters: Character[],
  tab: CharacterFilterType
): Character[] {
  switch (tab) {
    case "all":
      return characters;
    case "students":
      return characters.filter((character) => character.hogwartsStudent);
    case "staff":
      return characters.filter((character) => character.hogwartsStaff);
    default:
      return characters;
  }
}
