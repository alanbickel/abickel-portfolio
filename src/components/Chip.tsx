import { Show, type JSX } from 'solid-js';
import '../assets/styles/Chip.scss';

type ChipProps = {
  label: string;
  icon?: JSX.Element;
  // Secondary text shown after the label, e.g. "working".
  detail?: string;
};

function Chip(props: ChipProps) {
  return (
    <span class="chip">
      {props.icon}
      <span class="chip-label">
        {props.label}
        <Show when={props.detail}>
          <span class="chip-detail"> · {props.detail}</span>
        </Show>
      </span>
    </span>
  );
}

export default Chip;
