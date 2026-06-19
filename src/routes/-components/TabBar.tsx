import { KeyboardEvent } from "react";
import { Button } from "@lib/components/Button";
import { characterTabs, CharacterFilterType } from "@lib/constants/filters";

type TabBarProps = {
  value: CharacterFilterType;
  onChange: (value: CharacterFilterType) => void;
};

export const TabBar = ({ value, onChange }: TabBarProps) => {
  // arrow keys move focus and activate the next/previous tab
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = characterTabs.findIndex((tab) => tab.id === value);
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % characterTabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + characterTabs.length) % characterTabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = characterTabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = characterTabs[nextIndex];
    onChange(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      id="character-filter-tabs"
      aria-label="Character filters"
      onKeyDown={handleKeyDown}
      className="flex justify-center rounded-xl bg-amber-900/15 p-1"
    >
      {characterTabs.map((tab) => (
        <Button
          key={tab.id}
          id={`tab-${tab.id}`}
          active={value === tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={value === tab.id}
          // Roving tabindex: only the active tab stays in the tab order
          tabIndex={value === tab.id ? 0 : -1}
          aria-controls="character-grid-panel"
          className="px-4 font-mono"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
