import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { projects } from '../data/projects';
import Chip from './Chip';
import '../assets/styles/Projects.scss';

function Projects() {
  return (
    <div id="projects">
      <div class="items-container">
        <h1>Projects</h1>
        <div class="project-grid">
          <For each={projects}>
            {(project) => (
              <article class="project-card">
                <div class="project-media" classList={{ contain: project.image.fit === 'contain' }}>
                  <img src={`${import.meta.env.BASE_URL}${project.image.src}`} alt={project.image.alt} loading="lazy" />
                </div>
                <div class="project-body">
                  <span class="project-badge">
                    <Dynamic component={project.badge.icon} aria-hidden="true" />
                    {project.badge.label}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Show when={project.overview}>
                    <p class="project-overview"><strong>Overview:</strong> {project.overview}</p>
                  </Show>
                  <Show when={project.note}>
                    <p class="project-note">{project.note}</p>
                  </Show>
                  <div class="project-tags">
                    <For each={project.tags}>{(tag) => <Chip label={tag} />}</For>
                  </div>
                  <div class="project-links">
                    <For each={project.links}>
                      {(link) => (
                        <a href={link.href} target="_blank" rel="noreferrer">
                          <Dynamic component={link.icon} aria-hidden="true" />
                          {link.label}
                        </a>
                      )}
                    </For>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

export default Projects;
