import { createSignal, onMount } from "solid-js";
import {
    Main,
    About,
    Experience,
    Skills,
    Contact,
    Navigation,
    Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
    const [mode, setMode] = createSignal<'dark' | 'light'>('dark');

    const handleModeChange = () => {
        setMode(mode() === 'dark' ? 'light' : 'dark');
    }

    onMount(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    });

    return (
    <div class={`main-container ${mode() === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation mode={mode()} onModeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            <About/>
            <Skills/>
            <Experience/>
            <Contact/>
        </FadeIn>
        <Footer />
    </div>
    );
}

export default App;
