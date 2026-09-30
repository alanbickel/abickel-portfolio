import { createMemo, createSignal, For, onCleanup, onMount, Show, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import HighlightsIcon from '~icons/solar/star-outline';
import AllIcon from '~icons/solar/case-outline';
import { employer, lenses, roles, type ExperiencePoint, type Lens } from '../data/experience';
import LensBar, { type LensOption } from './LensBar';
import '../assets/styles/Timeline.scss'

type TimelineElementProps = {
  date: string;
  icon: JSX.Element;
  children: JSX.Element;
};

// One entry on the timeline. Bounces in the first time it scrolls into view.
function TimelineElement(props: TimelineElementProps) {
  const [inView, setInView] = createSignal(false);
  let element!: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -40px 0px' });

    observer.observe(element);
    onCleanup(() => observer.disconnect());
  });

  const animationClasses = () => ({ 'bounce-in': inView(), 'is-hidden': !inView() });

  return (
    <div ref={element} class="vertical-timeline-element">
      <span class="vertical-timeline-element-icon" classList={animationClasses()}>
        {props.icon}
      </span>
      <div class="vertical-timeline-element-content" classList={animationClasses()}>
        <div class="vertical-timeline-element-content-arrow" />
        {props.children}
        <span class="vertical-timeline-element-date">{props.date}</span>
      </div>
    </div>
  );
}

type LensId = Lens | 'highlights' | 'all';

const lensOptions: (LensOption<LensId> & { icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> })[] = [
  { id: 'highlights', label: 'Highlights', icon: HighlightsIcon },
  { id: 'all', label: 'All', icon: AllIcon },
  ...lenses,
];

const totalPoints = roles.reduce((sum, role) => sum + role.points.length, 0);

const matchesLens = (point: ExperiencePoint, lens: LensId) => {
  if (lens === 'all') return true;
  if (lens === 'highlights') return !!point.highlight;
  return point.tags.includes(lens);
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// '2023-06' -> 'Jun 2023'
const monthYear = (date: string) => `${MONTHS[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;
const dateRange = (start: string, end: string) => `${monthYear(start)} - ${monthYear(end)}`;

function Timeline() {
  const [lens, setLens] = createSignal<LensId>('highlights');
  // Timeline markers show the selected lens's icon.
  const lensIcon = () => lensOptions.find((option) => option.id === lens())!.icon;

  const visibleCount = createMemo(() =>
    roles.reduce((sum, role) => sum + role.points.filter((point) => matchesLens(point, lens())).length, 0)
  );

  return (
    <div id="history">
      <div class="items-container">
        <h1>Career History</h1>
        <p class="timeline-employer">
          <strong>{employer.name}</strong> · {employer.location}
          <br />
          {employer.description}
        </p>
        <LensBar
          options={lensOptions}
          selected={lens()}
          onSelect={setLens}
          label="Filters"
          status={`Showing ${visibleCount()} of ${totalPoints}`}
        />
        <div class="vertical-timeline vertical-timeline--animate vertical-timeline--two-columns">
          <For each={roles}>
            {(role) => {
              // Roles always stay on the timeline; the lens only filters their bullets.
              const points = createMemo(() => role.points.filter((point) => matchesLens(point, lens())));

              return (
                <TimelineElement date={dateRange(role.start, role.end)} icon={<Dynamic component={lensIcon()} />}>
                  <h3 class="vertical-timeline-element-title">{role.title}</h3>
                  <Show when={role.product}>
                    <h4 class="vertical-timeline-element-subtitle">{role.product}</h4>
                  </Show>
                  <Show
                    when={points().length > 0}
                    fallback={<p class="timeline-empty">No relevant experience for this role. Try choosing another filter.</p>}
                  >
                    <ul class="timeline-points">
                      <For each={points()}>
                        {(point) => (
                          <li>
                            {point.text}
                            <Show when={point.details}>
                              <ul>
                                <For each={point.details}>{(detail) => <li>{detail}</li>}</For>
                              </ul>
                            </Show>
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                </TimelineElement>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
