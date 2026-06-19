import { houseSlugToApiHouse, houses, houseSlugs, isHouseSlug, toHouseSlug } from "./houses";

describe("isHouseSlug", () => {
  it("returns true for valid slugs", () => {
    for (const slug of houseSlugs) {
      expect(isHouseSlug(slug)).toBe(true);
    }
  });

  it("returns false for invalid slugs", () => {
    expect(isHouseSlug("invalid")).toBe(false);
    expect(isHouseSlug("Gryffindor")).toBe(false);
  });
});

describe("toHouseSlug", () => {
  it("converts a house name to a lowercase slug", () => {
    for (const house of houses) {
      expect(toHouseSlug(house)).toBe(house.toLowerCase());
    }
  });
});

describe("houseSlugToApiHouse", () => {
  it("maps house slugs to API house names", () => {
    expect(houseSlugToApiHouse.gryffindor).toBe("Gryffindor");
    expect(houseSlugToApiHouse.slytherin).toBe("Slytherin");
    expect(houseSlugToApiHouse.hufflepuff).toBe("Hufflepuff");
    expect(houseSlugToApiHouse.ravenclaw).toBe("Ravenclaw");
  });

  it("maps all to null so the API fetches every character", () => {
    expect(houseSlugToApiHouse.all).toBeNull();
  });
});
