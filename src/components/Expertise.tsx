import { createSignal, For } from "solid-js";
import { expertiseAreas, type Skill } from '../data/expertise';
import Chip from './Chip';
import ExpertiseWheel from './ExpertiseWheel';
import '../assets/styles/Expertise.scss';

const tabId = (areaId: string) => `expertise-tab-${areaId}`;
const panelId = (areaId: string) => `expertise-panel-${areaId}`;

const skillDetail = (skill: Skill) =>
    [skill.note, skill.level].filter(Boolean).join(' · ') || undefined;

function Expertise() {
    const [selectedId, setSelectedId] = createSignal(expertiseAreas[0].id);

    return (
    <div class="container" id="expertise">
        <div class="skills-container">
            <h1>Wheelhouse</h1>
            <div class="expertise-explorer">
                <ExpertiseWheel
                    areas={expertiseAreas}
                    selectedId={selectedId()}
                    onSelect={setSelectedId}
                    tabId={tabId}
                    panelId={panelId}
                />
                {/* Every panel sits in the same grid cell, so the area is always as tall as the
                    tallest panel and the page below doesn't jump when the selection changes. */}
                <div class="expertise-panels">
                    <For each={expertiseAreas}>
                        {(area) => {
                            const selected = () => area.id === selectedId();
                            return (
                                <div
                                    id={panelId(area.id)}
                                    class="expertise-panel"
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

export default Expertise;
