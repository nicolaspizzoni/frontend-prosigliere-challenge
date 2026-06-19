import { cn } from "@lib/utils";
import { Character } from "@lib/constants/characters";
import { HouseSlug } from "@lib/constants/houses";
import { Link } from "@tanstack/react-router";
import { FavoriteToggle } from "./FavoriteToggle";

type CharacterCardBaseProps = {
  character: Character;
  className?: string;
  /** Outer wrapper (hover scale, transition). */
  wrapperClassName?: string;
  titleAs?: "h3" | "h2" | "h1";
  titleId?: string;
};

type CharacterCardLinkedProps = CharacterCardBaseProps & {
  /** When true (default), wraps the card in a link to the detail page. */
  linkToDetail?: true;
  houseSlug: HouseSlug;
};

type CharacterCardStaticProps = CharacterCardBaseProps & {
  /** When false, renders static card (no navigation). */
  linkToDetail: false;
};

type CharacterCardProps = CharacterCardLinkedProps | CharacterCardStaticProps;

export const CharacterCard = (props: CharacterCardProps) => {
  const {
    character,
    className,
    wrapperClassName,
    titleAs = "h3",
    titleId,
    linkToDetail = true,
  } = props;
  const Title = titleAs;

  const cardContent = (
    <article
      className={cn(
        "relative isolate flex h-87.5 flex-col justify-end overflow-hidden rounded-2xl px-3 py-6 shadow-md shadow-zinc-950",
        linkToDetail ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      <img
        src={character.image || undefined}
        alt={character.name}
        // Detail page card keeps default eager loading for LCP
        loading={linkToDetail ? "lazy" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-stone-900/20"></div>
      <Title className="text-cream z-10 font-light tracking-wide" id={titleId}>
        {character.name}
      </Title>
    </article>
  );

  return (
    <div className={cn("relative", wrapperClassName)}>
      {props.linkToDetail !== false ? (
        <Link
          to="/$house/character/$characterId"
          params={{ house: props.houseSlug, characterId: character.id }}
          // Preserve the current filter in the URL
          search={true}
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
      <FavoriteToggle characterId={character.id} name={character.name} />
    </div>
  );
};
