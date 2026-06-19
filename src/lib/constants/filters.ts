import { z } from "zod";

// Extended the filters to include all characters, students, staff and favorite, matching the design mockup.
export const characterFilters = ["all", "students", "staff", "favorite"] as const;

export type CharacterFilterType = (typeof characterFilters)[number];

// Default tab when ?filter is missing from the URL
export const defaultCharacterFilterSearch = { filter: "all" } as const;

// Fallback to "all" when the URL filter param is missing or invalid.
export const characterFilterSearchSchema = z.object({
  filter: z.enum(characterFilters).default("all").catch("all"),
});

export const characterTabs: {
  id: CharacterFilterType;
  label: string;
}[] = [
  {
    id: "all",
    label: "All Characters",
  },
  {
    id: "students",
    label: "Students",
  },
  {
    id: "staff",
    label: "Staff",
  },
  {
    id: "favorite",
    label: "Favorite",
  },
];
