import {
  formatAlternateNames,
  formatAvailableDate,
  formatBoolean,
  formatText,
} from "./formatCharacter";

describe("formatText", () => {
  it("returns the value when present", () => {
    expect(formatText("Harry Potter")).toBe("Harry Potter");
  });

  it("returns Unknown for empty or missing values", () => {
    expect(formatText("")).toBe("Unknown");
    expect(formatText(undefined)).toBe("Unknown");
  });
});

describe("formatBoolean", () => {
  it("returns Yes or No for booleans", () => {
    expect(formatBoolean(true)).toBe("Yes");
    expect(formatBoolean(false)).toBe("No");
  });

  it("returns Unknown for undefined", () => {
    expect(formatBoolean(undefined)).toBe("Unknown");
  });
});

describe("formatAlternateNames", () => {
  it("joins names with commas", () => {
    expect(formatAlternateNames(["The Boy Who Lived", "The Chosen One"])).toBe(
      "The Boy Who Lived, The Chosen One"
    );
  });

  it("returns Unknown for empty arrays", () => {
    expect(formatAlternateNames([])).toBe("Unknown");
    expect(formatAlternateNames(undefined)).toBe("Unknown");
  });
});

describe("formatAvailableDate", () => {
  it("formats a valid date", () => {
    expect(formatAvailableDate("31-07-1980")).toBe("July 31, 1980");
  });

  it("returns Unknown for missing dates", () => {
    expect(formatAvailableDate(undefined)).toBe("Unknown");
  });
});
