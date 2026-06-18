import { mockCharacters } from "../../../test/mocks";
import { filterCharactersByTab } from "./filterCharacters";

describe("filterCharactersByTab", () => {
  describe("favorite", () => {
    it("returns only characters whose ids are in favoriteCharacterIds", () => {
      const result = filterCharactersByTab(mockCharacters, "favorite", ["1", "3"]);

      expect(result).toHaveLength(2);
      expect(result.map((character) => character.id)).toEqual(["1", "3"]);
    });

    it("returns an empty array when favoriteCharacterIds is empty", () => {
      expect(filterCharactersByTab(mockCharacters, "favorite", [])).toEqual([]);
    });

    it("ignores favorite ids that are not in the character list", () => {
      const result = filterCharactersByTab(mockCharacters, "favorite", ["1", "999"]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });
  });
});
