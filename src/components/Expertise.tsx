import { createMemo, createSignal, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { expertiseAreas, type Skill } from '../data/expertise';
import Chip from './Chip';
import ExpertiseWheel from './ExpertiseWheel';
import '../assets/styles/Expertise.scss';

const PANEL_ID = 'expertise-panel';
const tabId = (areaId: string) => `expertise-tab-${areaId}`;

const skillDetail = (skill: Skill) =>
    [skill.note, skill.level].filter(Boolean).join(' · ') || undefined;

function Expertise() {
    const [selectedId, setSelectedId] = createSignal(expertiseAreas[0].id);
    const selected = createMemo(() => expertiseAreas.find((area) => area.id === selectedId())!);

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
                    panelId={PANEL_ID}
                />
                <div
                    id={PANEL_ID}
                    class="expertise-panel"
                    role="tabpanel"
                    aria-labelledby={tabId(selectedId())}
                    tabIndex={0}
                >
                    <Dynamic component={selected().icon} class="skill-icon" />
                    <h3>{selected().label}</h3>
                    <p>{selected().summary}</p>
                    <p class="chip-title">Tech stack</p>
                    <div class="flex-chips">
                        <For each={selected().skills}>
                            {(skill) => <Chip label={skill.name} detail={skillDetail(skill)} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
