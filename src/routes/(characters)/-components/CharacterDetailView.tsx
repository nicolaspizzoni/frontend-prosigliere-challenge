import { BookOpen, School, Sparkles, Star, User } from "lucide-react";
import { InfoSection } from "@lib/components/InfoSection";
import { Character } from "@lib/constants/characters";
import {
  formatAlternateActors,
  formatAvailableDate,
  formatBoolean,
  formatText,
} from "../-utils/formatCharacter";

type CharacterDetailViewProps = {
  character: Character;
};

export const CharacterDetailView = ({ character }: CharacterDetailViewProps) => {
  const alternateNamesList =
    character.alternate_names?.map((name) => name.trim()).filter(Boolean) ?? [];
  const hasAlternateNames = alternateNamesList.length > 0;
  console.log("character", character);
  const hasAlternateActors = character.alternate_actors && character.alternate_actors.length > 0;

  return (
    <main
      className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
      aria-labelledby="character-name"
    >
      <section
        aria-label="Character profile"
        className="mx-auto flex max-w-[824px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-4"
      >
        <aside aria-label="Character identity" className="mx-auto shrink-0 lg:mx-0">
          <figure className="relative h-[369px] w-[262px] overflow-hidden rounded-2xl shadow-md shadow-zinc-950">
            {character.image ? (
              <img src={character.image} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-stone-900/60 text-amber-200/50"
                role="img"
                aria-label="No character image available"
              >
                No image
              </div>
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent"
            />
            <Star aria-hidden className="text-foreground/80 absolute top-3 right-3 z-10 size-5" />
            <figcaption className="absolute bottom-4 left-4 z-10">
              <h1 id="character-name" className="text-cream text-lg font-normal uppercase">
                {formatText(character.name)}
              </h1>
            </figcaption>
          </figure>

          {hasAlternateNames ? (
            <dl className="mt-[14px] max-w-[262px]">
              <dt className="text-muted m-0 inline text-base font-normal uppercase">
                Also known as:{" "}
              </dt>
              {alternateNamesList.map((name, index) => (
                <dd
                  key={`${name}-${index}`}
                  className="text-muted m-0 inline text-base leading-relaxed font-light not-last:after:content-[',_']"
                >
                  {formatText(name)}
                </dd>
              ))}
            </dl>
          ) : null}
        </aside>

        <section
          aria-label="Character details"
          className="bg-background flex-1 rounded-2xl border border-amber-900/30 p-6"
        >
          <InfoSection title="Basic Information" icon={<User aria-hidden className="size-5" />}>
            <InfoSection.Grid>
              <InfoSection.Item label="Species" value={formatText(character.species)} />
              <InfoSection.Item label="Gender" value={formatText(character.gender)} />
              <InfoSection.Item
                label="Date of Birth"
                value={formatAvailableDate(character.dateOfBirth)}
              />
              <InfoSection.Item label="Ancestry" value={formatText(character.ancestry)} />
              <InfoSection.Item label="Eye Color" value={formatText(character.eyeColour)} />
              <InfoSection.Item label="Hair Color" value={formatText(character.hairColour)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection
            title="Magical Information"
            icon={<Sparkles aria-hidden className="size-5" />}
          >
            <InfoSection.Grid>
              <InfoSection.Item label="Wizard/Witch" value={formatBoolean(character.wizard)} />
              <InfoSection.Item label="Patronus" value={formatText(character.patronus)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection title="Hogwarts" icon={<School aria-hidden className="size-5" />}>
            <InfoSection.Grid>
              <InfoSection.Item label="Student" value={formatBoolean(character.hogwartsStudent)} />
              <InfoSection.Item label="Staff" value={formatBoolean(character.hogwartsStaff)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection title="Portrayed By" icon={<BookOpen aria-hidden className="size-5" />}>
            <InfoSection.Grid>
              <InfoSection.Item value={formatText(character.actor)} />
              {hasAlternateActors ? (
                <InfoSection.Item
                  label="Also portrayed by"
                  value={formatAlternateActors(character.alternate_actors)}
                />
              ) : null}
            </InfoSection.Grid>
          </InfoSection>
        </section>
      </section>
    </main>
  );
};
