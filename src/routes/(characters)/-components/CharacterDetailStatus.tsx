import { ErrorComponentProps, Link, useParams, useRouter } from "@tanstack/react-router";

const BackToCharactersLink = () => {
  const { house } = useParams({ from: "/$house/character/$characterId" });
  return (
    <Link
      to="/$house"
      params={{ house }}
      search={true}
      className="text-sm font-medium text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
    >
      Back to characters
    </Link>
  );
};

export const CharacterNotFound = () => (
  <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-20 text-center">
    <p className="text-lg text-amber-200/60">Character not found</p>
    <p className="text-sm text-amber-200/30">
      The character you are looking for does not exist or may have been removed.
    </p>
    <div className="mt-2">
      <BackToCharactersLink />
    </div>
  </div>
);

export const CharacterLoadError = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  const handleRetry = () => {
    reset?.();
    router.invalidate();
  };

  return (
    <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-20 text-center">
      <p className="text-lg text-amber-200/60">
        Something went wrong while loading this character.
      </p>
      <p className="text-sm text-amber-200/30">
        {error instanceof Error ? error.message : "Please try again later."}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleRetry}
          className="text-sm font-medium text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
        >
          Try again
        </button>
        <BackToCharactersLink />
      </div>
    </div>
  );
};
