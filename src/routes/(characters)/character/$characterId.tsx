import { createFileRoute, isNotFound, notFound, useLoaderData } from "@tanstack/react-router";
import { fetchCharacter } from "@lib/api/characters";
import { CharacterDetailView } from "../-components/CharacterDetailView";
import { CharacterLoadError, CharacterNotFound } from "../-components/CharacterDetailStatus";
import { Character } from "@lib/constants/characters";

export const Route = createFileRoute("/(characters)/character/$characterId")({
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
    from: "/(characters)/character/$characterId",
  });
  return <CharacterDetailView character={characterData} />;
}
