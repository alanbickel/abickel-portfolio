import { createSignal, onCleanup, onMount, type JSX } from "solid-js";
import BriefcaseIcon from '~icons/fa6-solid/briefcase';
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

function Timeline() {
  return (
    <div id="history">
      <div class="items-container">
        <h1>Career History</h1>
        <div class="vertical-timeline vertical-timeline--animate vertical-timeline--two-columns">
        </div>
      </div>
    </div>
  );
}

export default Timeline;
