import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@lib/components/Button";
import { houses, HouseSlug, toHouseSlug } from "@lib/constants/houses";
import { HouseCard } from "./-components/HouseCard";

// House selection screen at / — replaces the old HousePreferenceGateway

export const Route = createFileRoute("/")({
  component: ChooseHouseView,
});

function ChooseHouseView() {
  const navigate = useNavigate();

  // Push a new history entry so browser back returns here
  const goToHouse = (slug: HouseSlug) => {
    navigate({ to: "/$house", params: { house: slug } });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-30">
      <h1 className="text-center text-3xl tracking-widest font-stretch-extra-expanded">
        Choose your preferred house
      </h1>

      <div className="flex flex-wrap items-center justify-evenly gap-12">
        {houses.map((house) => (
          <HouseCard key={house} house={house} onClick={() => goToHouse(toHouseSlug(house))} />
        ))}
      </div>

      <Button onClick={() => goToHouse("all")} className="self-center text-lg">
        Show all characters
      </Button>
    </div>
  );
}
