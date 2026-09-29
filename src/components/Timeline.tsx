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
          <TimelineElement
            date="2023 - present"
            icon={<BriefcaseIcon />}
          >
            <h3 class="vertical-timeline-element-title">Software Engineer</h3>
            <h4 class="vertical-timeline-element-subtitle">Big Ideas Learning, LLC <span class="subtitle-smalltext"><i>(formerly Larson Texts, Inc.)</i></span></h4>
            <p>
              Full-stack LMS Software Development, AWS Cloud Architecture implementation, Data Engineering, End-to-End Project Technical Leadership
            </p>
          </TimelineElement>
          <TimelineElement
            date="2022 - 2023"
            icon={<BriefcaseIcon />}
          >
            <h3 class="vertical-timeline-element-title">Junior Software Engineer</h3>
            <h4 class="vertical-timeline-element-subtitle">Big Ideas Learning, LLC </h4>
            <p>
              Project Leadership, Research & Development Data Extraction & Analysis,Frontend Development, Backend Development, Internal Tooling
            </p>
          </TimelineElement>
          <TimelineElement
            date="2021 - 2022"
            icon={<BriefcaseIcon />}
          >
            <h3 class="vertical-timeline-element-title">Software Development Intern</h3>
            <h4 class="vertical-timeline-element-subtitle">Larson Texts, Inc.</h4>
            <p>
              Database modeling, API Development, Frontend Development
            </p>
          </TimelineElement>
          <TimelineElement
            date="2020 - 2022"
            icon={<BriefcaseIcon />}
          >
            <h3 class="vertical-timeline-element-title">Web Developer Intern / Creative Director & Animator / Coding Tutor</h3>
            <h4 class="vertical-timeline-element-subtitle">Pennsylvania State University, the Behrend College</h4>
            <p>
              Animation & Video Production, Digital Art Gallery Design & Development, Text Encoding & Web Development Tutoring
            </p>
          </TimelineElement>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
