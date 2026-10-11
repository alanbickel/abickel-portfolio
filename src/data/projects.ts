import type { Component, JSX } from 'solid-js';
import PackageIcon from '~icons/solar/box-bold';
import GameIcon from '~icons/solar/gamepad-bold';
import GithubIcon from '~icons/fa6-brands/github';
import NpmIcon from '~icons/fa6-brands/npm';
import ExternalIcon from '~icons/solar/arrow-right-up-linear';

type Icon = Component<JSX.SvgSVGAttributes<SVGSVGElement>>;

export type ProjectLink = {
  label: string;
  href: string;
  icon: Icon;
};

export type Project = {
  id: string;
  title: string;
  // Short label above the title, e.g. "npm package".
  badge: { label: string; icon: Icon };
  image: {
    // Path under public/.
    src: string;
    alt: string;
    // 'contain' letterboxes images that don't match the card's 16:10 frame.
    fit: 'cover' | 'contain';
  };
  description: string;
  // Smaller supporting line under the description.
  note?: string;
  // Longer first-person summary of the project.
  overview?: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: 'plinko-config',
    title: 'plinko-config',
    badge: { label: 'npm package', icon: PackageIcon },
    image: {
      src: 'projects/plinko-config.gif',
      alt: 'A Plinko board with Light, Dark, and System slots. Three chips are dragged onto it one at a time; as each lands, the card below switches to that theme.',
      fit: 'contain',
    },
    description: 'Gamify your settings. Drive your app with plinko-config, a delightfully sinister UI component.',
    note: 'Framework-agnostic · A11y-first · Zero runtime dependencies',
    overview: "I'd been toying with the idea of making some 'Terrible UI' components for a while, and decided to spin the concept away from 'objectively awful' to 'intentionally infuriating'. My favorite part of bringing this project together was exploring all the ways that I could let a developer customize and configure the library, while making it simple to bring a bit of whimsy and sassiness into an application.",
    tags: ['TypeScript', 'Web Components', 'LittleJS'],
    links: [
      { label: 'Docs', href: 'https://alanbickel.github.io/plinko-config/', icon: ExternalIcon },
      { label: 'npm', href: 'https://www.npmjs.com/package/plinko-config', icon: NpmIcon },
      { label: 'GitHub', href: 'https://github.com/alanbickel/plinko-config', icon: GithubIcon },
    ],
  },
  {
    id: 'cat-avator',
    title: "Triskaideka-Cat's Elevator Caper",
    badge: { label: 'JS13K 2024 entry', icon: GameIcon },
    image: {
      src: 'projects/cat-avator.png',
      alt: 'Title screen: an orange cat sitting in an open elevator, under the words "The Catvator and the 13 Floors".',
      fit: 'cover',
    },
    description: 'A very low-res 1st person cat platformer game that takes place in a haunted elevator!',
    note: "The annual JS13K competition is an open challenge to ship a complete game that's under 13 KB, bundled.",
    overview: 'This was an extracurricular competition I entered with a few colleagues. I had the pleasure of designing global and game-level state management and state transition mechanics, along with supporting contributions to game level development.',
    tags: ['JavaScript', 'HTML'],
    links: [
      { label: 'Play', href: 'https://js13kgames.com/2024/games/triskaideka-cats-elevator-caper', icon: ExternalIcon },
      { label: 'GitHub', href: 'https://github.com/triskaideka013/cat-avator', icon: GithubIcon },
    ],
  },
];
