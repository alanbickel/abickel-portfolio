import type { Component, JSX } from 'solid-js';
import FrontendIcon from '~icons/solar/monitor-smartphone-outline';
import BackendIcon from '~icons/solar/server-2-outline';
import DataIcon from '~icons/solar/database-outline';
import CloudIcon from '~icons/solar/cloud-outline';
import PipelineIcon from '~icons/solar/branching-paths-up-outline';
import AiIcon from '~icons/solar/magic-stick-3-outline';

export type Skill = {
  name: string;
  // 'working' marks hands-on but not yet deep experience, as flagged on the resume.
  level?: 'working';
  // Extra context shown alongside the skill, e.g. a certification.
  note?: string;
};

export type SkillArea = {
  id: string;
  label: string;
  // Wedge label when `label` is too long to fit inside the wheel.
  shortLabel?: string;
  icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
  // Detail-pane blurb.
  summary: string;
  skills: Skill[];
};

// Merged from the skills sections of the staff (2026), ClassDojo, and MGH resume variants.
export const skillAreas: SkillArea[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FrontendIcon,
    summary:
      'Service-oriented UI applications in SolidJS, Angular, and Blazor. Event-driven architecture and micro front-end integration. Peer-to-peer and peer-through-server event dispatching.   ',
    skills: [
      { name: 'SolidJS' },
      { name: 'Angular' },
      { name: 'Blazor (WASM)' },
      { name: 'JavaScript/TypeScript' },
      { name: 'Micro-frontends' },
      { name: 'Event-driven architecture' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend/API',
    icon: BackendIcon,
    summary:
      'Containerized and cloud-native API and service design, including Identity and Authorization integrations with first and third-party integrations ',
    skills: [
      { name: 'Node.js' },
      { name: 'TypeScript' },
      { name: 'Foxx' },
      { name: 'C#' },
      { name: 'Python (FastAPI)' },
      { name: 'PHP' },
      { name: 'Java', level: 'working' },
      { name: 'GraphQL', level: 'working' },
      { name: 'REST/microservices' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    icon: DataIcon,
    summary:
      'Relational and graph persistence, including modeling directed, multi-axis knowledge graphs and automating idempotent Amazon Neptune migrations with a local Neo4j counterpart.',
    skills: [
      { name: 'MySQL' },
      { name: 'PostgreSQL', level: 'working' },
      { name: 'ArangoDB' },
      { name: 'Neo4j & Amazon Neptune', level: 'working', note: 'OpenCypher' },
      { name: 'MongoDB' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: CloudIcon,
    summary:
      'Owned architecture and delivery for a new line of business, including its adoption of cloud-native solutions on AWS.',
    skills: [
      { name: 'S3' },
      { name: 'CloudFront' },
      { name: 'SQS' },
      { name: 'RDS' },
      { name: 'Lambda' },
      { name: 'Cognito' },
      { name: 'Verified Permissions (AVP)' },
      { name: 'Secrets Manager' },
      { name: 'Kubernetes' },
      { name: 'Docker' },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD & Infrastructure',
    shortLabel: 'CI/CD',
    icon: PipelineIcon,
    summary:
      'Designed, implemented, and maintained front-end and back-end CI/CD pipelines in GitHub Actions, including automated test execution and database migrations.',
    skills: [
      { name: 'Bitbucket' },
      { name: 'GitHub' },
      { name: 'GitHub Actions' },
      { name: 'Husky' },
      { name: 'Vitest' },
      { name: 'Testcontainers' },
      { name: 'Database migration automation' },
      { name: 'Helm', level: 'working' },
      { name: 'AWS SAM', level: 'working' },
    ],
  },
  {
    id: 'ai',
    label: 'AI-Assisted Development',
    shortLabel: 'AI-Assisted',
    icon: AiIcon,
    summary:
      'Human-owned, AI-assisted design and development workflows that keep design decisions and accountability in engineers\' hands. Led sanctioned AI pilot evaluations.',
    skills: [
      { name: 'Claude Code', note: 'custom skills, project memory, ADR-grounded context' },
      { name: 'AI-assisted PR review' },
      { name: 'Test design and implementation' },
      { name: 'Diagnostics' },
      { name: 'Diagramming' },
      { name: 'Mechanical implementations' },
      { name: 'ADR drafting' },
    ],
  },
];
