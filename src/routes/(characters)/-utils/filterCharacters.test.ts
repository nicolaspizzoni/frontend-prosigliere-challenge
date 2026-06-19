import { mockCharacters } from "../../../test/mocks";
import { filterCharactersByTab } from "./filterCharacters";

describe("filterCharactersByTab", () => {
  describe("all", () => {
    it("returns the full list unchanged", () => {
      expect(filterCharactersByTab(mockCharacters, "all", [])).toEqual(mockCharacters);
    });
  });

  describe("students", () => {
    it("returns only characters with hogwartsStudent: true", () => {
      const result = filterCharactersByTab(mockCharacters, "students", []);

      expect(result.map((character) => character.id)).toEqual(["1", "2"]);
    });
  });

  describe("staff", () => {
    it("returns only characters with hogwartsStaff: true", () => {
      const result = filterCharactersByTab(mockCharacters, "staff", []);

      expect(result.map((character) => character.id)).toEqual(["3"]);
    });
  });

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
