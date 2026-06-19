import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@lib/api/characters";
import { Character } from "@lib/constants/characters";

import { HouseType } from "@lib/constants/houses";

export const useCharacters = (house: HouseType | null) => {
  const { data, ...rest } = useQuery<Character[]>({
    // Key by house so cache does not reuse data after switching houses
    queryKey: ["characters", house],
    queryFn: () => fetchCharacters(house),
    staleTime: Infinity,
  });

  const characters = data?.filter((character) => character.image) || [];

  return {
    characters,
    ...rest,
  };
};
