import type { Component, JSX } from 'solid-js';
import ArchitectureIcon from '~icons/solar/ruler-cross-pen-bold';
import DeliveryIcon from '~icons/solar/code-square-bold';
import LeadershipIcon from '~icons/solar/flag-bold';
import CoachingIcon from '~icons/solar/users-group-rounded-bold';
import DxIcon from '~icons/solar/settings-minimalistic-bold';

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
  name: 'Big Ideas Learning, LLC',
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
        text: 'Owned architecture and delivery for new line-of-business expansion.',
        details: [
          'Architected and implemented K8s-hosted Blazor/.NET/ArangoDB stack.',
          'Collaborated directly with company owner and senior leadership to realize product vision in early prototypes.',
          'Orchestrated onboarding and upskilling efforts to support expansion of engineering team from 4 → 16 engineers, including quality engineering.',
        ],
        tags: ['architecture', 'leadership'],
        highlight: true,
      },
      {
        text: 'Shipped stable alpha release to internal customers and led technical planning efforts to keep delivery aligned with target market release dates.',
        tags: ['leadership'],
      },
      {
        text: 'Implemented and tested platform-critical modules and subsystems.',
        tags: ['delivery'],
      },
      {
        text: 'Partnered with engineering manager to establish product refinement as upstream gateway to developer handoff, reducing QA bounce-backs, mid-flight spec changes, and post-delivery defects.',
        tags: ['leadership', 'dx'],
        highlight: true,
      },
      {
        text: 'Performed feasibility and paradigm alignment analysis on inbound product concepts before each delivery cycle to prevent volatile specifications from reaching development team.',
        tags: ['architecture'],
      },
      {
        text: 'Conducted multiple fit analysis exercises across front-end, API, persistence, and authorization layers.',
        tags: ['architecture'],
        highlight: true,
      },
      {
        text: 'Presented TCO estimations and recommendations with tactical risk assessment to support transition from prototyping to product development.',
        tags: ['architecture', 'leadership'],
        highlight: true,
      },
      {
        text: 'Designed, implemented, and maintained front-end and back-end CI/CD pipelines in GitHub Actions, including automated test execution and idempotent Amazon Neptune migrations with local Neo4j counterpart.',
        tags: ['dx', 'delivery'],
      },
      {
        text: 'Diagnosed front-end test-suite performance using AI-assisted instrumentation and benchmarking. Delivered root-cause analysis and mitigation steps, and realized ~44% reduction in test-suite runtime (~90s → ~50s).',
        tags: ['dx'],
        highlight: true,
      },
      {
        text: 'Lobbied for use of AI support in engineering workflows and led sanctioned pilot evaluations. Delivered technical guidance for adopting centralized behavioral guardrails.',
        tags: ['dx'],
      },
      {
        text: 'Standardized in-codebase ADR tracking, risk register governance, and technical debt capture.',
        tags: ['dx'],
        highlight: true,
      },
      {
        text: 'Led engineering team of 16 through multiple full-stack rewrites within 12-month window.',
        details: [
          'Delivered cloud-native refactor of multi-year prototype in 4 months.',
          'Planned and led implementation and onboarding strategy for 2 full-stack cutovers: Blazor/.NET/ArangoDB → SolidJS/Python/PostgreSQL → SolidJS/GraphQL/Neptune.',
          'Drove stabilization efforts for infrastructure cutover from containerized K8s to Lambda/RDS, including local development solutions.',
        ],
        tags: ['leadership', 'architecture', 'delivery'],
      },
      {
        text: 'Stabilized novel monorepo port of multi-project codebase under 3-week existential deadline.',
        details: [
          'Audited, identified, and resolved behavioral and integration defects across all stack layers, including replacement of missing authorization plane.',
          'Authored setup guidance and ADRs for key inflection points to facilitate rapid team onboarding to new codebase.',
          'Committed ~50K LoC of changes and positioned team to deliver all required features with zero critical defects, no drift on delivery date.',
        ],
        tags: ['delivery', 'leadership'],
        highlight: true,
      },
      {
        text: 'Served as technical reconciliation layer between product owner, company owner, and software engineering director; ensured that reliable, coherent delivery goals were set for the team.',
        tags: ['leadership'],
        highlight: true,
      },
      {
        text: 'Fostered collaboration-first coaching and course-correction strategies across multiple organizational layers to mitigate miscommunication-driven friction.',
        tags: ['coaching'],
      },
      {
        text: 'Gave software design talks and architectural testing workshops at 2 internal professional development conferences.',
        tags: ['coaching'],
      },
    ],
  },
  {
    id: 'acting-tech-lead',
    title: 'Senior Software Engineer | Acting Tech Lead',
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
        highlight: true,
      },
      {
        text: 'Established mutual cross-team design approval workflow with offshore leads to ensure technical alignment and identify gaps before implementation.',
        tags: ['dx', 'leadership'],
        highlight: true,
      },
      {
        text: 'Implemented and tested critical application infrastructure customizations and extensions.',
        tags: ['delivery'],
      },
      {
        text: 'Protected codebase health and maintainability during a heavily compressed delivery window (24 → 18 months).',
        details: [
          'Authored wiki-style coding-standards guides for hybrid delivery team of 16 onshore and 30 offshore engineers.',
          'Normalized constructive PR feedback pattern of linking to wiki standards in PR comments.',
          'Created and facilitated formal Angular and unit-testing bootcamps for onshore team.',
        ],
        tags: ['coaching', 'dx'],
        highlight: true,
      },
      {
        text: 'Mentored junior and mid-level engineers in application design, modeling, and unit-testing best practices. Actively coached multiple junior engineers through junior-to-mid transitions.',
        tags: ['coaching'],
      },
      {
        text: 'Estimated capacity for in-house commitments and recommended cross-team workload distribution during quarterly planning.',
        tags: ['leadership'],
      },
      {
        text: 'Coordinated delivery of cross-team implementation dependencies with offshore counterparts.',
        tags: ['leadership'],
        highlight: true,
      },
      {
        text: 'Championed creation of Software Engineer and Senior Software Engineer title levels at Big Ideas Learning.',
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
        text: 'Collaborated directly with curriculum domain experts to test and analyze pedagogical impacts of evaluations and recommendations derived from knowledge graphs.',
        tags: ['architecture'],
        highlight: true,
      },
      {
        text: 'Designed, implemented, and tested core platform module architectures to scale in-house development impact and reduce need for offshore expansion.',
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
    title: 'Software Engineer | Maintainer',
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
        text: 'Designed and implemented digital classroom content-loading system to ingest new compiled page content.',
        details: [
          'Infinite-scroll experience for students with cached content pre-fetch and pre-load buffers.',
          'Custom messaging protocol providing secure data transfer and lifecycle event broadcasting between application shell and embedded page content.',
        ],
        tags: ['architecture', 'delivery'],
      },
      {
        text: 'Developed and tested ETL tooling to ensure accurate student data transfer as part of assessment system redesign.',
        tags: ['delivery'],
        highlight: true,
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
        highlight: true,
      },
      {
        text: 'Created proof-of-concept language-translation pipeline under the guidance of the engineering manager, capable of generating Spanish-language variants of multimedia content.',
        tags: ['delivery', 'architecture'],
      },
    ],
  },
];
