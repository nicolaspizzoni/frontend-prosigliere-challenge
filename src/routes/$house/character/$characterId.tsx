import { createFileRoute, isNotFound, notFound, useLoaderData } from "@tanstack/react-router";
import { fetchCharacter } from "@lib/api/characters";
import { CharacterDetailView } from "../../(characters)/-components/CharacterDetailView";
import { CharacterLoadError, CharacterNotFound } from "../../(characters)/-components/CharacterDetailStatus";
import { Character } from "@lib/constants/characters";

export const Route = createFileRoute("/$house/character/$characterId")({
  loader: async ({ context: { queryClient }, params: { characterId } }) => {
    try {
      const character = await queryClient.ensureQueryData({
        queryKey: ["characters", characterId],
        queryFn: () => fetchCharacter(characterId),
        retry: false,
      });
      if (!character) throw notFound();
      return character;
    } catch (error) {
      if (isNotFound(error)) throw error;
      queryClient.removeQueries({ queryKey: ["characters", characterId] });
      throw error;
    }
  },
  notFoundComponent: CharacterNotFound,
  errorComponent: CharacterLoadError,
  component: RouteCharacterDetailView,
});

function RouteCharacterDetailView() {
  const characterData: Character = useLoaderData({
    from: "/$house/character/$characterId",
  });
  return <CharacterDetailView character={characterData} />;
}
