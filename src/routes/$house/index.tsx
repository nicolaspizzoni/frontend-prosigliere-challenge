import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import {
  characterFilterSearchSchema,
  CharacterFilterType,
  defaultCharacterFilterSearch,
} from "@lib/constants/filters";
import { houseSlugToApiHouse } from "@lib/constants/houses";
import { CharactersGrid } from "../(characters)/-components/CharactersGrid";
import { TabBar } from "../-components/TabBar";

export const Route = createFileRoute("/$house/")({
  validateSearch: characterFilterSearchSchema,
  search: {
    // Hide ?filter=all from the URL; ex.: /gryffindor already means "all"
    middlewares: [stripSearchParams(defaultCharacterFilterSearch)],
  },
  component: HouseCharactersView,
});

function HouseCharactersView() {
  const { house } = Route.useParams();
  const { filter } = Route.useSearch();
  const navigate = Route.useNavigate();
  const apiHouse = houseSlugToApiHouse[house];

  const setFilter = (value: CharacterFilterType) => {
    // Replace history entry so browser back skips tab changes and goes to choose-house
    navigate({ search: { filter: value }, replace: true });
  };

  return (
    <div className="flex flex-col items-center gap-8 max-sm:px-4">
      <TabBar value={filter} onChange={setFilter} />
      {/* Tab panel linked to the active tab via aria-labelledby */}
      <div
        role="tabpanel"
        id="character-grid-panel"
        aria-labelledby={`tab-${filter}`}
      >
        <CharactersGrid filter={filter} house={apiHouse} houseSlug={house} />
      </div>
    </div>
  );
}
