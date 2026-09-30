import { children, For, type JSX } from "solid-js";
import '../assets/styles/FadeIn.scss';

type FadeInProps = {
  children: JSX.Element;
  // Stagger between each child starting its animation, in ms.
  delay?: number;
  transitionDuration?: number;
};

// Fades and slides each child in, one after another.
export default function FadeIn(props: FadeInProps) {
  const items = children(() => props.children);

  return (
    <div>
      <For each={items.toArray()}>
        {(child, i) => (
          <div
            class="fade-in"
            style={{
              "animation-duration": `${props.transitionDuration ?? 400}ms`,
              "animation-delay": `${(i() + 1) * (props.delay ?? 50)}ms`,
            }}
          >
            {child}
          </div>
        )}
      </For>
    </div>
  );
}
