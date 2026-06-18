import { Button } from "@lib/components/Button";
import { characterTabs, CharacterFilterType } from "@lib/constants/filters";

type TabBarProps = {
  value: CharacterFilterType;
  onChange: (value: CharacterFilterType) => void;
};

export const TabBar = ({ value, onChange }: TabBarProps) => {
  return (
    <div role="tablist" className="flex justify-center rounded-xl bg-amber-900/15 p-1">
      {characterTabs.map((tab) => (
        <Button
          key={tab.id}
          active={value === tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={value === tab.id}
          className="px-4 font-mono"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
