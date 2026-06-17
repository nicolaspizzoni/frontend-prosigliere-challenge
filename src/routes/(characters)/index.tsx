import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CharacterFilterType } from "@lib/constants/filters";
import { CharactersGrid } from "./-components/CharactersGrid";
import { TabBar } from "../-components/TabBar";

export const Route = createFileRoute("/(characters)/")({
  component: CharactersIndexView,
});

function CharactersIndexView() {
  const [filter, setFilter] = useState<CharacterFilterType>("all");

  return (
    <div className="flex flex-col items-center gap-8">
      <TabBar value={filter} onChange={setFilter} />
      <CharactersGrid filter={filter} />
    </div>
  );
}
