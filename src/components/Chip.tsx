import type { JSX } from 'solid-js';
import '../assets/styles/Chip.scss';

type ChipProps = {
  label: string;
  icon?: JSX.Element;
};

function Chip(props: ChipProps) {
  return (
    <span class="chip">
      {props.icon}
      <span class="chip-label">{props.label}</span>
    </span>
  );
}

export default Chip;
