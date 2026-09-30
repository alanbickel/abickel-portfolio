import type { Component, JSX } from 'solid-js';
import ArchitectureIcon from '~icons/solar/ruler-cross-pen-outline';
import DeliveryIcon from '~icons/solar/code-square-outline';
import LeadershipIcon from '~icons/solar/flag-outline';
import CoachingIcon from '~icons/solar/users-group-rounded-outline';
import DxIcon from '~icons/solar/settings-minimalistic-outline';

export type Lens = 'architecture' | 'delivery' | 'leadership' | 'coaching' | 'dx';

export const lenses: {
  id: Lens;
  label: string;
  // Shown on the timeline markers while this lens is selected.
  icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
}[] = [
  { id: 'architecture', label: 'Architecture & Design', icon: ArchitectureIcon },
  { id: 'delivery', label: 'Hands-on Delivery', icon: DeliveryIcon },
  { id: 'leadership', label: 'Technical Leadership', icon: LeadershipIcon },
  { id: 'coaching', label: 'Coaching & Team Building', icon: CoachingIcon },
  { id: 'dx', label: 'Developer Experience', icon: DxIcon },
];

export type ExperiencePoint = {
  text: string;
  // Sub-points rendered as a nested list under the bullet.
  details?: string[];
  // Lenses this bullet shows up under. Untagged bullets only appear with no lens selected.
  tags: Lens[];
  // Shown in the default Highlights view.
  highlight?: boolean;
};

export type Role = {
  id: string;
  title: string;
  // Product or team the role centered on, shown after the title.
  product?: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM
  points: ExperiencePoint[];
};

export const employer = {
  name: 'Big Ideas Learning, LLC (a Larson Texts company)',
  location: 'Erie, PA',
  description: 'Big Ideas Learning is a publisher of K-12 and higher education mathematics curriculum.',
};

// Merged from the experience sections of the staff (2026), ClassDojo, and MGH resume variants.
// Where bullets were duplicated across resumes, the newer senior-variant wording is used.
// Newest role first.
// Highlights are placeholders for implementation and testing; to be curated.
export const roles: Role[] = [
  {
    id: 'architect',
    title: 'Architect & Technical Lead',
    product: 'New Product Line',
    start: '2023-06',
    end: '2026-09',
    points: [
      {
        text: 'Owned architecture and delivery for new line-of-business expansion, including adoption of cloud-native solutions as prototype efforts matured.',
        tags: ['architecture', 'leadership'],
        highlight: true,
      },
      {
        text: 'Delivered a stable internal alpha and led technical planning efforts to keep delivery aligned with target market release dates.',
        tags: ['leadership'],
      },
      {
        text: 'Responsible for implementation and testing of platform-critical modules and sub-systems.',
        tags: ['delivery'],
      },
      {
        text: 'Led multiple fit analysis exercises across frontend, API, persistence, and authorization layers.',
        tags: ['architecture'],
      },
      {
        text: 'Delivered TCO estimations and recommendations with tactical risk assessment to support transition from prototyping to product development.',
        tags: ['architecture', 'leadership'],
      },
      {
        text: 'Designed, implemented, and maintained front-end and back-end CI/CD pipelines in GitHub Actions, including automated test execution and idempotent Amazon Neptune migrations with a local Neo4j counterpart.',
        tags: ['dx', 'delivery'],
      },
      {
        text: 'Diagnosed front-end test-suite performance using AI-assisted instrumentation and benchmarking. Delivered root-cause analysis and mitigation steps, realized a ~40% reduction in test-suite runtime.',
        tags: ['dx'],
      },
      {
        text: 'Lobbied for the use of AI support in engineering workflows, led sanctioned pilot evaluations. Delivered technical guidance for adopting centralized behavioral guardrails.',
        tags: ['dx'],
      },
      {
        text: 'Led standardization efforts for in-codebase ADR tracking, risk register governance, and technical debt capture.',
        tags: ['dx'],
      },
      {
        text: 'Navigated multiple full-stack rewrites within a 12-month window, including an organization-mandated cutover that introduced novel technologies to the team.',
        tags: ['leadership'],
      },
      {
        text: 'Served as the technical reconciliation layer between product owner, company owner, and software engineering director; ensured that reliable, coherent delivery goals were set for the team.',
        tags: ['leadership'],
      },
      {
        text: 'Championed collaboration-first coaching and course-correction strategies across multiple organizational layers to mitigate miscommunication-driven friction.',
        tags: ['coaching'],
      },
      {
        text: 'Delivered software design talks and architectural testing workshops at two internal PD conferences.',
        tags: ['coaching'],
      },
    ],
  },
  {
    id: 'acting-tech-lead',
    title: 'Acting Tech Lead',
    product: 'My Ada Math (LMS/CMS/Assessment System)',
    start: '2021-08',
    end: '2023-06',
    points: [
      {
        text: 'Provided architecture and design support to onshore and offshore teams.',
        tags: ['architecture'],
      },
      {
        text: 'Delivered application and data architecture proposals for multiple feature improvements and platform extensions.',
        tags: ['architecture'],
      },
      {
        text: 'Established a mutual cross-team design approval workflow with offshore leads to ensure technical alignment and identify gaps before implementation.',
        tags: ['dx', 'leadership'],
      },
      {
        text: 'Championed wiki-style coding-standards guides, ran formal PD bootcamps in Angular and front-end unit testing, coached junior and mid-level engineers to build unit testing competence.',
        tags: ['coaching', 'dx'],
      },
      {
        text: 'Mentored junior and mid-level engineers in application design, modeling, and unit testing best practices. Actively coached multiple junior engineers through junior-to-mid transitions.',
        tags: ['coaching'],
        highlight: true,
      },
      {
        text: 'Estimated capacity for in-house commitments and recommended cross-team workload distribution during quarterly planning.',
        tags: ['leadership'],
      },
      {
        text: 'Coordinated delivery of cross-team implementation dependencies with offshore counterparts.',
        tags: ['leadership'],
      },
      {
        text: 'Championed the creation of Software Engineer and Senior Software Engineer title levels at Big Ideas Learning.',
        tags: ['coaching'],
      },
    ],
  },
  {
    id: 'research',
    title: 'Internal Prototyping & Research',
    start: '2020-09',
    end: '2021-08',
    points: [
      {
        text: 'Performed exploratory system design and product capability prototyping.',
        tags: ['architecture'],
      },
      {
        text: 'Led modeling, design, and implementation of directed, multi-axis knowledge graphs and related proof-of-concept governance applications.',
        tags: ['architecture', 'delivery'],
        highlight: true,
      },
      {
        text: 'Collaborated directly with curriculum domain experts to test and analyze the pedagogical impacts of evaluations and recommendations derived from knowledge graphs.',
        tags: ['architecture'],
      },
      {
        text: 'Designed, implemented, and tested core platform module architectures to scale in-house development impact and reduce the need for offshore expansion.',
        tags: ['architecture', 'delivery'],
      },
      {
        text: 'Explored workflow solutions for curriculum SME ownership of knowledge graph data governance.',
        tags: ['architecture'],
      },
    ],
  },
  {
    id: 'core-maintainer',
    title: 'Core Maintainer',
    product: 'Big Ideas Math (LMS/CMS/Assessment System)',
    start: '2018-06',
    end: '2020-09',
    points: [
      {
        text: 'Proposed, designed, and implemented improvements to in-house digital content-authoring strategy.',
        details: [
          'Template-based GUI extensions for internal CMS that eliminated HTML/CSS training barriers for content authors.',
          'Automated back-end content assembly of structural markup, database content, styling, and JavaScript modules.',
          'TUI publishing application for batched assembly and deployment of content pages to static asset servers.',
        ],
        tags: ['architecture', 'delivery'],
      },
      {
        text: 'Designed and implemented a digital classroom content-loading system to ingest new compiled page content.',
        details: [
          'Infinite-scroll experience for students with cached content pre-fetch and pre-load buffers.',
          'Custom messaging protocol providing secure data transfer and lifecycle event broadcasting between the application shell and embedded page content.',
        ],
        tags: ['architecture', 'delivery'],
        highlight: true,
      },
      {
        text: 'Developed and tested ETL tooling to ensure accurate student data transfer as part of an assessment system redesign.',
        tags: ['delivery'],
      },
    ],
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    start: '2017-03',
    end: '2018-06',
    points: [
      {
        text: 'Implemented and delivered ancillary business and marketing websites.',
        tags: ['delivery'],
      },
      {
        text: 'Maintained internal and public-facing print product repository portals.',
        tags: ['delivery'],
      },
      {
        text: 'Developed and deployed interactive browser-based versions of text-based math games for K-5 students under the direction of curriculum domain experts.',
        tags: ['delivery'],
      },
      {
        text: 'Built custom ETL tools to parse hand-maintained CSV and XLSX files, validate data integrity, and generate SQL scripts for database propagation.',
        tags: ['delivery'],
      },
      {
        text: 'Created proof-of-concept language-translation pipeline under the guidance of Engineering Manager, capable of generating Spanish-language variants of multimedia content.',
        tags: ['delivery', 'architecture'],
      },
    ],
  },
];
