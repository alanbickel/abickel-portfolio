import type { Component, JSX } from 'solid-js';
import ArchitectureIcon from '~icons/solar/ruler-cross-pen-bold';
import ImplementationIcon from '~icons/solar/code-square-bold';
import MaintenanceIcon from '~icons/solar/server-square-update-bold';
import LeadershipIcon from '~icons/solar/flag-bold';
import CoachingIcon from '~icons/solar/users-group-rounded-bold';
import DxIcon from '~icons/solar/settings-minimalistic-bold';

export type Lens = 'architecture' | 'implementation' | 'maintenance' | 'leadership' | 'coaching' | 'dx';

export const lenses: {
  id: Lens;
  label: string;
  // Shown on the timeline markers while this lens is selected.
  icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
}[] = [
  { id: 'architecture', label: 'Architecture & Design', icon: ArchitectureIcon },
  { id: 'implementation', label: 'Hands-on Implementation', icon: ImplementationIcon },
  { id: 'maintenance', label: 'Production & Maintenance', icon: MaintenanceIcon },
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
        tags: ['architecture', 'leadership', 'implementation'],
        highlight: true,
      },
      {
        text: 'Shipped stable alpha release to internal customers and led technical planning efforts to keep delivery aligned with target market release dates.',
        tags: ['leadership'],
      },
      {
        text: 'Implemented and tested platform-critical modules and subsystems.',
        tags: ['implementation'],
      },
      {
        text: 'Designed and implemented fine-grained, attribute-based authorization in Amazon Verified Permissions, consumed by Apollo GraphQL API.',
        tags: ['architecture', 'implementation'],
      },
      {
        text: 'Led design and implementation of authentication workflows: Cognito IdP, Lambda custom authorizers protecting API endpoints, and client session management with automated token renewal and inactivity timeouts.',
        tags: ['architecture', 'implementation'],
      },
      {
        text: 'Identified and mitigated latent authorization defect before public launch.',
        details: [
          "Per-resource policy writes were exceeding Verified Permissions' write-rate limit, and Lambda retries were masking the failure. ~15% of user registrations succeeded only on the final retry.",
          'Redesigned policy-write strategy around static global templates, removing per-resource policy writes.',
          'Worked with product to trim beta-scope user and resource management features to create bandwidth for implementing the patch.',
        ],
        tags: ['maintenance', 'architecture', 'leadership'],
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
        tags: ['dx', 'implementation'],
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
        tags: ['leadership', 'architecture', 'implementation'],
      },
      {
        text: 'Stabilized novel monorepo port of multi-project codebase under 3-week existential deadline.',
        details: [
          'Audited, identified, and resolved behavioral and integration defects across all stack layers, including replacement of missing authorization plane.',
          'Authored setup guidance and ADRs for key inflection points to facilitate rapid team onboarding to new codebase.',
          'Committed ~50K LoC of changes and positioned team to deliver all required features with zero critical defects, no drift on delivery date.',
        ],
        tags: ['implementation', 'maintenance', 'leadership'],
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
    id: 'tech-lead',
    title: 'Senior Software Engineer | Technical Lead',
    product: 'My Ada Math (LMS/CMS/Assessment System)',
    start: '2021-08',
    end: '2023-06',
    points: [
      {
        text: 'Provided architecture and design leadership for hybrid delivery org of 16 onshore and 30 offshore engineers, customizing and extending licensed LMS/CMS/assessment platform running on AWS EKS.',
        tags: ['architecture', 'leadership'],
      },
      {
        text: 'Delivered application and data architecture proposals for multiple feature improvements and platform extensions.',
        tags: ['architecture'],
        highlight: true,
      },
      {
        text: 'Established mutual cross-team design approval workflow with offshore leads to ensure technical alignment and identify gaps before implementation.',
        tags: ['dx', 'leadership', 'architecture'],
        highlight: true,
      },
      {
        text: 'Implemented and tested critical application infrastructure customizations and extensions.',
        tags: ['implementation'],
      },
      {
        text: 'Led diagnosis of Angular front-end memory leaks.',
        tags: ['maintenance'],
      },
      {
        text: 'Co-designed cross-platform SSO, rostering, and identity strategy for all flagship platforms.',
        tags: ['architecture'],
      },
      {
        text: 'Protected codebase health and maintainability during a heavily compressed delivery window (24 → 18 months).',
        details: [
          'Authored wiki-style coding-standards guides used by both onshore and offshore teams.',
          'Normalized constructive PR feedback pattern of linking to wiki standards in PR comments.',
          'Created and facilitated formal Angular and unit-testing bootcamps for onshore team.',
        ],
        tags: ['coaching', 'dx'],
        highlight: true,
      },
      {
        text: 'Mentored junior and mid-level engineers in application design, modeling, and unit-testing best practices. Actively coached 4 junior engineers through junior-to-mid transitions.',
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
        tags: ['architecture', 'implementation'],
        highlight: true,
      },
      {
        text: 'Collaborated directly with curriculum domain experts to test and analyze pedagogical impacts of evaluations and recommendations derived from knowledge graphs.',
        tags: ['architecture'],
        highlight: true,
      },
      {
        text: 'Designed, implemented, and tested core platform module architectures to scale in-house development impact and reduce need for offshore expansion.',
        tags: ['architecture', 'implementation'],
      },
      {
        text: 'Explored workflow solutions for curriculum SME ownership of knowledge graph data governance.',
        tags: ['architecture'],
      },
      {
        text: 'Assisted engineering manager with ad-hoc PHP upgrades (v7 → v8).',
        tags: ['maintenance'],
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
        text: 'Maintained production PHP services and satellite APIs connected to production application database; triaged hotfix defects in Java/Hibernate back-end, including slow-query diagnosis and service outages from mis-rotated API keys.',
        tags: ['maintenance'],
      },
      {
        text: 'Led triage and mitigation of student-authored assessment exploit published on GitHub, used by 1K+ students.',
        details: [
          'Traced root cause to changes in assessment service provider configurations, plus unvalidated client-supplied value; coordinated fix with development partner in under 36 hours.',
          'Identified affected student records for district notification; supported legal takedown of exploit and its forks.',
        ],
        tags: ['maintenance', 'leadership'],
      },
      {
        text: 'Built and maintained PHP Learnosity initialization API for digital classroom exercises: signed requests, validated student and classroom context, and mitigated re-use of session data from students repeating a course.',
        tags: ['implementation', 'maintenance'],
      },
      {
        text: 'Wrote and ran PHP CLI ETL tools migrating 1M+ student assessment attempt records and 15K teacher-authored assessments to new MySQL schema, ahead of back-to-school launch of redesigned assessment system.',
        details: ['Validated with dry runs, side-by-side tables, obfuscated-ID logging, and scripted accuracy probes before cutover.'],
        tags: ['implementation', 'maintenance'],
        highlight: true,
      },
      {
        text: 'Built PHP (Slim) REST API and OAuth 2.0 server for external content vendor to curate narration transcripts and upload ~50K voice-talent recordings.',
        tags: ['implementation'],
      },
      {
        text: 'Supported LTI grade passback and SSO (Clever, Canvas) integrations.',
        tags: ['maintenance'],
      },
      {
        text: 'Proposed, designed, and implemented improvements to in-house digital content-authoring strategy.',
        details: [
          'Template-based GUI extensions for internal CMS that eliminated HTML/CSS training barriers for content authors.',
          'Automated back-end content assembly of structural markup, database content, styling, and JavaScript modules.',
          'TUI publishing application for batched assembly and deployment of content pages to static asset servers.',
        ],
        tags: ['architecture', 'implementation'],
      },
      {
        text: 'Designed and implemented digital classroom content-loading system to ingest new compiled page content.',
        details: [
          'Infinite-scroll experience for students with cached content pre-fetch and pre-load buffers.',
          'Custom messaging protocol providing secure data transfer and lifecycle event broadcasting between application shell and embedded page content.',
        ],
        tags: ['architecture', 'implementation'],
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
        tags: ['implementation'],
      },
      {
        text: 'Maintained and extended in-house PHP textbook-authoring CMS and repository behind marketing site.',
        tags: ['maintenance', 'implementation'],
      },
      {
        text: 'Built PHP scraping tools to extract text from tens of thousands of assessment items, later seeding audio-narration transcripts.',
        tags: ['implementation'],
      },
      {
        text: 'Developed and deployed interactive browser-based versions of text-based math games for K-5 students under the direction of curriculum domain experts.',
        tags: ['implementation'],
      },
      {
        text: 'Built custom ETL tools to parse hand-maintained CSV and XLSX files, validate data integrity, and generate SQL scripts for database propagation.',
        tags: ['implementation'],
        highlight: true,
      },
      {
        text: 'Created proof-of-concept language-translation pipeline under the guidance of the engineering manager, capable of generating Spanish-language variants of multimedia content.',
        tags: ['implementation', 'architecture'],
      },
    ],
  },
];
