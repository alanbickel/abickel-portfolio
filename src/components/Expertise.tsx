import { For } from "solid-js";
import AngularIcon from '~icons/fa6-brands/angular';
import PythonIcon from '~icons/fa6-brands/python';
import AwsIcon from '~icons/fa6-brands/aws';
import DockerIcon from '~icons/fa6-brands/docker';
import DatabaseIcon from '~icons/fa6-solid/database';
import ToolboxIcon from '~icons/fa6-solid/toolbox';
import Chip from './Chip';
import '../assets/styles/Expertise.scss';

const labelsFrontend = [
    "Angular",
    "React",
    "TypeScript",
    "Blazor",
    "HTML5",
    "CSS3",
    "SCSS",
    "Responsive Design",
    "Mobile-First Development",
    "Storybook",
];

const labelsBackend = [
    "C# / .NET",
    "Node.js",
    "Python",
    "Pyspark",
    "Go",
    "FastAPI",
    "REST API Development",
    "GraphQL",
    "Event-Driven Applications",
];

const labelsDatabases = [
    "PostgreSQL",
    "MySQL",
    "MariaDB",
    "NoSQL",
    "Neo4j",
    "ArangoDB",
    "Neptune",
    "Elasticsearch",
];

const labelsCloud = [
    "Lambda",
    "CloudWatch",
    "Glue ETL",
    "Step Functions",
    "Amazon Athena",
    "S3",
    "API Gateway",
    "CloudFormation (IaC)",
    "Cognito",
    "Verified Permissions",
];

const labelsTesting = [
    "xUnit",
    "Jest",
    "Jasmine & Karma",
    "Playwright",
];

const labelsDevOps = [
    "Docker",
    "CI/CD",
    "Bitbucket Pipelines",
    "GitHub Actions",
];

const labelsSdlc = [
    "Agile",
    "Scrum",
    "Jira",
];

const labelsDevTools = [
    "Git / GitHub",
    "Bitbucket",
    "Postman",
    "Visual Studio",
    "VS Code",
    "Claude Code",
];

function Expertise() {
    return (
    <div class="container" id="expertise">
        <div class="skills-container">
            <h1>Expertise</h1>
            <div class="skills-grid">
                <div class="skill">
                    <AngularIcon class="skill-icon"/>
                    <h3>Front-End Development</h3>
                    <p>5+ years of experience building accessible, responsive, and reusable UI components with Angular, React, and TypeScript, following mobile-first design principles and component-driven development.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsFrontend}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>

                <div class="skill">
                    <PythonIcon class="skill-icon"/>
                    <h3>Back-End Development</h3>
                    <p>4+ years of designing and developing RESTful (and more recently GraphQL) API services, within both Monolithic and Micro-service architectures, across C#/.NET, Python, and Golang projects. Deep expertise in building and integrating RESTful backend services for high-traffic production applications.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsBackend}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>

                <div class="skill">
                    <DatabaseIcon class="skill-icon"/>
                    <h3>Database Design & Governance</h3>
                    <p>Over 4 years of production experience in relational database schema design and administration, plus hands-on work with NoSQL and graph databases for unstructured and experimental traversal data modeling.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsDatabases}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>

                <div class="skill">
                    <AwsIcon class="skill-icon"/>
                    <h3>Cloud & Infrastructure (AWS)</h3>
                    <p>I architect cloud-native, serverless solutions on AWS, from Glue ETL pipeline optimization to zero-trust access control layers with Cognito and Verified Permissions.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsCloud}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>

                {/* <div class="skill">
                    <VialIcon class="skill-icon"/>
                    <h3>Testing & QA</h3>
                    <p>I write automated test suites spanning unit, integration, and end-to-end coverage, and collaborate closely with QA engineers to align testing strategy across complex feature releases.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsTesting}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div> */}

                <div class="skill">
                    <DockerIcon class="skill-icon"/>
                    <h3>DevOps</h3>
                    <p>I containerize applications with Docker and build CI/CD pipelines to support reliable, repeatable deployments from development through production.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsDevOps}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>

                {/* <div class="skill">
                    <JiraIcon class="skill-icon"/>
                    <h3>SDLC</h3>
                    <p>I lead sprint planning and Agile/Scrum ceremonies, translating complex product requirements into Jira-tracked technical designs across cross-functional teams.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsSdlc}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div> */}

                <div class="skill">
                    <ToolboxIcon class="skill-icon"/>
                    <h3>Development Tools</h3>
                    <p>I rely on a modern engineering toolkit — Git/GitHub, Bitbucket, Postman, Visual Studio, and Claude Code — to design, test, and ship high-quality software efficiently.</p>
                    <div class="flex-chips">
                        <span class="chip-title">Tech stack:</span>
                        <For each={labelsDevTools}>
                            {(label) => <Chip label={label} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
