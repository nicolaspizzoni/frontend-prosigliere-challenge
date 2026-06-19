export const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"] as const;

export type HouseType = (typeof houses)[number];

export const houseSlugs = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw", "all"] as const;

export type HouseSlug = (typeof houseSlugs)[number];

// Map URL slug to API house filter (null = fetch all characters)
export const houseSlugToApiHouse: Record<HouseSlug, HouseType | null> = {
  gryffindor: "Gryffindor",
  slytherin: "Slytherin",
  hufflepuff: "Hufflepuff",
  ravenclaw: "Ravenclaw",
  all: null,
};

// Helper functions to validate and convert between house types and slugs
export function isHouseSlug(value: string): value is HouseSlug {
  return (houseSlugs as readonly string[]).includes(value);
}

export function toHouseSlug(house: HouseType): HouseSlug {
  return house.toLowerCase() as HouseSlug;
}
