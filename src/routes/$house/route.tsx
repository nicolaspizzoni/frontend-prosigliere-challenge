import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isHouseSlug } from "@lib/constants/houses";
import { Toolbar } from "../-components/Toolbar";

export const Route = createFileRoute("/$house")({
  params: {
    // Normalize slug from URL (always lowercase in links)
    parse: ({ house }) => {
      const slug = house.toLowerCase();
      // Invalid house slugs redirect to the choose house screen at "/".
      if (!isHouseSlug(slug)) {
        throw redirect({ to: "/" });
      }
      return { house: slug };
    },
    stringify: ({ house }) => ({ house }),
  },
  component: HouseLayout,
});

function HouseLayout() {
  return (
    <>
      <Toolbar />
      <Outlet />
    </>
  );
}
