import { characterFilterSearchSchema } from "./filters";

describe("characterFilterSearchSchema", () => {
  it("parses a valid filter", () => {
    expect(characterFilterSearchSchema.parse({ filter: "students" })).toEqual({
      filter: "students",
    });
  });

  it("defaults to all when filter is missing", () => {
    expect(characterFilterSearchSchema.parse({})).toEqual({ filter: "all" });
  });

  it("falls back to all for invalid filter values", () => {
    expect(characterFilterSearchSchema.parse({ filter: "invalid" })).toEqual({ filter: "all" });
  });
});
