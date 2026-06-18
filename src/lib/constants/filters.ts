//Extended the filters to include all characters, students, staff and favorite, matching the design mockup.
export const characterFilters = ["all", "students", "staff", "favorite"] as const;

export type CharacterFilterType = (typeof characterFilters)[number];

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
