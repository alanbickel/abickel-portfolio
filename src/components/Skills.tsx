import { createSignal, For } from "solid-js";
import { skillAreas, type Skill } from '../data/skills';
import Chip from './Chip';
import SkillsWheel from './SkillsWheel';
import '../assets/styles/Skills.scss';

const tabId = (areaId: string) => `skills-tab-${areaId}`;
const panelId = (areaId: string) => `skills-panel-${areaId}`;

const skillDetail = (skill: Skill) =>
    [skill.note, skill.level].filter(Boolean).join(' · ') || undefined;

function Skills() {
    const [selectedId, setSelectedId] = createSignal(skillAreas[0].id);

    return (
    <div class="container" id="skills">
        <div class="skills-container">
            <h1>Skills</h1>
            <p class="section-intro">Select a skillset to view details</p>
            <div class="skills-explorer">
                <SkillsWheel
                    areas={skillAreas}
                    selectedId={selectedId()}
                    onSelect={setSelectedId}
                    tabId={tabId}
                    panelId={panelId}
                />
                {/* Every panel sits in the same grid cell, so the area is always as tall as the
                    tallest panel and the page below doesn't jump when the selection changes. */}
                <div class="skills-panels">
                    <For each={skillAreas}>
                        {(area) => {
                            const selected = () => area.id === selectedId();
                            return (
                                <div
                                    id={panelId(area.id)}
                                    class="skills-panel"
                                    classList={{ selected: selected() }}
                                    role="tabpanel"
                                    aria-labelledby={tabId(area.id)}
                                    aria-hidden={!selected()}
                                    tabIndex={selected() ? 0 : -1}
                                >
                                    <h3>{area.label}</h3>
                                    <p>{area.summary}</p>
                                    <p class="chip-title">Tech stack</p>
                                    <div class="flex-chips">
                                        <For each={area.skills}>
                                            {(skill) => <Chip label={skill.name} detail={skillDetail(skill)} />}
                                        </For>
                                    </div>
                                </div>
                            );
                        }}
                    </For>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Skills;
