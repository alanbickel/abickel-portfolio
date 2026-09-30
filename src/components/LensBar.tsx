import { createUniqueId, For } from 'solid-js';
import '../assets/styles/LensBar.scss';

export type LensOption<T extends string> = {
  id: T;
  label: string;
};

type LensBarProps<T extends string> = {
  options: LensOption<T>[];
  selected: T;
  onSelect: (id: T) => void;
  // Visible caption above the options; also names the group for assistive tech.
  label: string;
  // Result summary, e.g. "Showing 4 of 34". Announced politely when it changes.
  status: string;
};

// Single-select row of toggle buttons for choosing which facet of a section to show.
function LensBar<T extends string>(props: LensBarProps<T>) {
  const labelId = createUniqueId();

  return (
    <div class="lens-bar">
      <p id={labelId} class="lens-label">{props.label}</p>
      <div class="lens-options" role="group" aria-labelledby={labelId}>
        <For each={props.options}>
          {(option) => (
            <button
              type="button"
              class="lens-option"
              aria-pressed={option.id === props.selected}
              onClick={() => props.onSelect(option.id)}
            >
              {option.label}
            </button>
          )}
        </For>
      </div>
      <p class="lens-status" aria-live="polite">{props.status}</p>
    </div>
  );
}

export default LensBar;
