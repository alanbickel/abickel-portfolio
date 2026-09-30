import { For } from 'solid-js';
import type { ExpertiseArea } from '../data/expertise';

type ExpertiseWheelProps = {
  areas: ExpertiseArea[];
  selectedId: string;
  onSelect: (id: string) => void;
  tabId: (id: string) => string;
  panelId: (id: string) => string;
};

// Geometry, in viewBox units (the wheel spans -100..100 on both axes).
const OUTER_RADIUS = 96;
const INNER_RADIUS = 30;
const LABEL_RADIUS = (OUTER_RADIUS + INNER_RADIUS) / 2 + 2;
const ICON_SIZE = 18;
// How far the selected wedge pops out from the center.
const SELECTED_OFFSET = 4;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const pointAt = (radius: number, degrees: number) => ({
  x: radius * Math.cos(toRadians(degrees)),
  y: radius * Math.sin(toRadians(degrees)),
});

// Ring segment from startAngle to endAngle (degrees, clockwise, 0 = 3 o'clock).
const wedgePath = (startAngle: number, endAngle: number) => {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const outerStart = pointAt(OUTER_RADIUS, startAngle);
  const outerEnd = pointAt(OUTER_RADIUS, endAngle);
  const innerStart = pointAt(INNER_RADIUS, startAngle);
  const innerEnd = pointAt(INNER_RADIUS, endAngle);
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
};

// Ring of selectable wedges, one per expertise area. Behaves as an ARIA tablist:
// arrow keys move between wedges, and only the selected wedge is in the tab order.
function ExpertiseWheel(props: ExpertiseWheelProps) {
  const sweep = () => 360 / props.areas.length;
  // Center the first wedge at 12 o'clock.
  const startAngle = (index: number) => -90 - sweep() / 2 + index * sweep();

  const selectAt = (index: number) => {
    const count = props.areas.length;
    const area = props.areas[(index + count) % count];
    props.onSelect(area.id);
    document.getElementById(props.tabId(area.id))?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: props.areas.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      selectAt(moves[event.key]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectAt(index);
    }
  };

  return (
    <svg class="expertise-wheel" viewBox="-100 -100 200 200" role="tablist" aria-label="Areas of expertise">
      <For each={props.areas}>
        {(area, index) => {
          const start = () => startAngle(index());
          const mid = () => start() + sweep() / 2;
          const label = () => pointAt(LABEL_RADIUS, mid());
          const selected = () => area.id === props.selectedId;
          const offset = () => (selected() ? pointAt(SELECTED_OFFSET, mid()) : { x: 0, y: 0 });

          return (
            <g
              id={props.tabId(area.id)}
              class="wedge"
              classList={{ selected: selected() }}
              role="tab"
              aria-label={area.label}
              aria-selected={selected()}
              aria-controls={props.panelId(area.id)}
              // Lowercase so Solid writes the attribute; the tabIndex property isn't reliable on SVG elements.
              tabindex={selected() ? 0 : -1}
              style={{ transform: `translate(${offset().x}px, ${offset().y}px)` }}
              onClick={() => selectAt(index())}
              onKeyDown={(event) => handleKeyDown(event, index())}
            >
              <path class="wedge-shape" d={wedgePath(start(), start() + sweep())} />
              <area.icon
                class="wedge-icon"
                x={label().x - ICON_SIZE / 2}
                y={label().y - ICON_SIZE - 1}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
              <text class="wedge-label" x={label().x} y={label().y + 9} text-anchor="middle">
                {area.shortLabel ?? area.label}
              </text>
            </g>
          );
        }}
      </For>
    </svg>
  );
}

export default ExpertiseWheel;
