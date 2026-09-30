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
    id: 'backend',
    label: 'Backend/API',
    icon: BackendIcon,
    summary:
      'Containerized and cloud-native API and service design, including Identity and Authorization integrations with first and third-party solutions ',
    skills: [
      { name: 'Node.js' },
      { name: 'TypeScript' },
      { name: 'Foxx' },
      { name: 'C#' },
      { name: 'Python (FastAPI)' },
      { name: 'PHP' },
      { name: 'Java' },
      { name: 'GraphQL' },
      { name: 'REST/microservices' },
    ],
  }, 
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
    id: 'data',
    label: 'Data',
    icon: DataIcon,
    summary:
      'Relational data modeling and normalization, directed graph data modeling and design, idempotent CI-friendly databse migrations',
    skills: [
      { name: 'MySQL & MariaDB' },
      { name: 'PostgreSQL' },
      { name: 'ArangoDB', note: "Fluent query factories, custom migration runners " },
      { name: 'Neo4j & Amazon Neptune', note: 'OpenCypher' },
      { name: 'MongoDB' },
      { name: 'DynamoDB' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: CloudIcon,
    summary:
      'AWS deployment, maintenance, and infrastructure design',
    skills: [
      { name: 'S3' },
      { name: 'CloudFront' },
      { name: 'API Gateway' },
      { name: 'SQS' },
      { name: 'RDS',  },
      { name: 'Lambda' },
      { name: 'Cognito' },
      { name: 'Verified Permissions (AVP)' },
      { name: 'Secrets Manager' },
      { name: 'Kubernetes', note: "Helm, K9s, Argo CD" },
      { name: 'Docker', note: "EC2" },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD & Infrastructure',
    shortLabel: 'CI/CD',
    icon: PipelineIcon,
    summary:
      'Pipeline design and implementation in GitHub Actions and BitBucket, automated test execution,  database migrations.',
    skills: [
      { name: 'Bitbucket' },
      { name: 'GitHub' },
      { name: 'GitHub Actions' },
      { name: 'Husky' },
      { name: 'Vitest' },
      { name: 'Testcontainers' },
      { name: 'Database migration automation' },
      { name: 'Helm' },
      { name: 'AWS SAM' },
    ],
  },
  {
    id: 'ai',
    label: 'AI-Assisted Development',
    shortLabel: 'AI-Assisted',
    icon: AiIcon,
    summary:
      'Human-owned, AI-assisted design and development workflows that keep design decisions and accountability in engineers\' hands.',
    skills: [
      { name: 'Claude Code', note: 'custom skills' },
      { name: 'AI-assisted PR review' },
      { name: 'Test design and implementation' },
      { name: 'Diagnostics' },
      { name: 'Diagramming' },
      { name: 'Mechanical implementations' },
      { name: 'ADR  & documentation drafting' },
    ],
  },
];
