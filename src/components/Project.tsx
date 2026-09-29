import ballot from '../assets/images/project-screenshots/academic/ballotandme.png';
import blues from '../assets/images/project-screenshots/academic/blues.png';
import dataviz from '../assets/images/project-screenshots/academic/dataviz-earnEduSex.png';
import mayans from '../assets/images/project-screenshots/academic/mayans.jpg';
import prtutorial from '../assets/images/project-screenshots/academic/pull-requests.png';
import svgtutorial from '../assets/images/project-screenshots/academic/SVGanim.png';
import threejsblog from '../assets/images/project-screenshots/academic/threeJSblog.jpg';
import artshow from '../assets/images/project-screenshots/internships/art_show.jpg';
import boldc from '../assets/images/project-screenshots/internships/boldC-site.jpg';
import digit from '../assets/images/project-screenshots/internships/digit-site.jpg';
import gorge from '../assets/images/project-screenshots/internships/gorge.jpg';
import lionspantry from '../assets/images/project-screenshots/internships/lionspantry.jpg';
import onegarden from '../assets/images/project-screenshots/internships/onegarden.jpg';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div class="projects-container" id="projects">
        <h1>Past Projects</h1>
        <h2 class="projects-section-title">Internship Projects</h2>
        <div class="projects-grid">
            <div class="project">
                <a href="https://digit-psb.github.io/student-art-show/index.html" target="_blank" rel="noreferrer"><img src={artshow} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://digit-psb.github.io/student-art-show/index.html" target="_blank" rel="noreferrer"><h2>Student Art Show Website</h2></a>
                <p>Independently led the design and development of the website for Penn State Behrend's Spring Student Art Show - written in pure HTML & CSS, andhosted with GitHub Pages.</p>
            </div>
            <div class="project">
                <a href="https://digit-psb.github.io/BOLDC/" target="_blank" rel="noreferrer"><img src={boldc} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://digit-psb.github.io/BOLDC/" target="_blank" rel="noreferrer"><h2>BOLD-C Website</h2></a>
                <p>Designed and built the website for the Behrend Open Lab of Digital Cinema (BOLD-C), hosted with GitHub Pages.</p>
            </div>
            <div class="project">
                <a href="https://digit-psb.github.io/DIGIT/" target="_blank" rel="noreferrer"><img src={digit} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://digit-psb.github.io/DIGIT/" target="_blank" rel="noreferrer"><h2>DIGIT Website</h2></a>
                <p>Led the initial design and development of the official website for Penn State Behrend's Digital Media, Arts, and Technology program - written in pure HTML & CSS, andhosted with GitHub Pages.</p>
            </div>
            <div class="project">
                <a href="https://sites.psu.edu/wintergreengorge/" target="_blank" rel="noreferrer"><img src={gorge} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://sites.psu.edu/wintergreengorge/" target="_blank" rel="noreferrer"><h2>Wintergreen Gorge Website</h2></a>
                <p>Designed and built a WordPress website for the Wintergreen Gorge site.</p>
            </div>
            <div class="project">
                <a href="https://sites.psu.edu/behrendlionspantry/" target="_blank" rel="noreferrer"><img src={lionspantry} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://sites.psu.edu/behrendlionspantry/" target="_blank" rel="noreferrer"><h2>Lions Pantry Website</h2></a>
                <p>Designed and built a WordPress website for the Behrend Lions Pantry.</p>
            </div>
            <div class="project">
                <a href="https://sites.psu.edu/onegarden/" target="_blank" rel="noreferrer"><img src={onegarden} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://sites.psu.edu/onegarden/" target="_blank" rel="noreferrer"><h2>One Garden Website</h2></a>
                <p>Designed and built a WordPress website for the One Garden project.</p>
            </div>
        </div>
        <h2 class="projects-section-title">Academic Projects</h2>
        <div class="projects-grid">
            <div class="project">
                <a href="https://am0eba-byte.github.io/blues/" target="_blank" rel="noreferrer"><img src={blues} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://am0eba-byte.github.io/blues/" target="_blank" rel="noreferrer"><h2>Blues Analysis Project</h2></a>
                <p>This venture in text markup and analysis took an impressive collection of 1,088 blues song lyrics from the legends of the genre and used various text analysis software programs to produce fascinating data and infographics, which give viewers a glimpse into just how vast, versatile, and far-reaching the blues has been historically and will continue to be.</p>
            </div>
            <div class="project">
                <a href="https://am0eba-byte.github.io/BallotandMe/" target="_blank" rel="noreferrer"><img src={ballot} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://am0eba-byte.github.io/BallotandMe/" target="_blank" rel="noreferrer"><h2>The Ballot and Me (Text Encoding Project)</h2></a>
                <p>This project created a web-readable view of an originally PDF-only source of Langston Hughes's remarkable play The Ballot and Me, and uses a variety of markup languages and XPath functions to identify and keep track of the historical figures who represent the characters of this monumental play, and highlights the importance of each of their parts reflected both in the play and in real life today.</p>
            </div>
            <div class="project">
                <a href="http://mayan.newtfire.org/" target="_blank" rel="noreferrer"><img src={mayans} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="http://mayan.newtfire.org/" target="_blank" rel="noreferrer"><h2>Ancient Mayans Digitized (AMD)</h2></a>
                <p>This was a project I led in 2021 which took on the challenge of collecting data on the ancient Mayans, organizing it into mappable structures, conducting data analysis using scripts such as XQuery, 3D modeling ancient Mayan artifacts, and developing an immersive and interactive web interface for users to explore.</p>
            </div>
            <div class="project">
                <a href="https://newtfire.github.io/newTutorials/gitBranching.html" target="_blank" rel="noreferrer"><img src={prtutorial} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://newtfire.github.io/newTutorials/gitBranching.html" target="_blank" rel="noreferrer"><h2>The Basics of Git Branching</h2></a>
                <p>A tutorial on the basics of Git branching, written for 100-level DIGIT students.</p>
            </div>
            <div class="project">
                <a href="https://newtfire.github.io/newTutorials/animatedIcon.html" target="_blank" rel="noreferrer"><img src={svgtutorial} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://newtfire.github.io/newTutorials/animatedIcon.html" target="_blank" rel="noreferrer"><h2>SVG Animation Walkthrough</h2></a>
                <p>A walkthrough tutorial on SVG animation, written for 100-level DIGIT students.</p>
            </div>
            <div class="project">
                <a href="https://am0eba-byte.github.io/internshipblog-3js/" target="_blank" rel="noreferrer"><img src={threejsblog} class="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://am0eba-byte.github.io/internshipblog-3js/" target="_blank" rel="noreferrer"><h2>Three.JS Internship Blog</h2></a>
                <p>Developed using Node.js and a nifty library called <a class="para-link" href="https://threejs.org/">Three.JS</a>, which made it possible to create a 3D environment from scratch using just vanilla JavaScript, HTML, and CSS. This blog documented my first few months working as a Software Development Intern at Larson Texts, Inc.</p>
            </div>
            <div class="project">
                <img src={dataviz} class="zoom" alt="thumbnail" width="100%"/>
                <h2>Median Earnings by Education Level and Sex</h2>
                <p>A data visualization exploring median earnings by education level and sex, created using R and Tableau.</p>
            </div>
            <div class="project">
                <iframe src="https://slides.com/elisabeshero-bondar/langston-hughes-and-the-blues-text-archiving-analysis-and-black-dh-for-undergraduates/embed" width="576" height="420" title="Langston Hughes and The Blues: Text Archiving, Analysis, and Black DH for Undergraduates" scrolling="no" allowfullscreen></iframe>
                <h2>Keystone DH Conference 2021 Presentation Slides</h2>
                <p>Slides from my presentation at the <a class="para-link" href="https://keystonedh.network/2021/">2021 Keystone Digital Humanities Conference</a>, where I presented my work on text-encoding and large-scale text analysis projects (<a class="para-link" href="https://am0eba-byte.github.io/BallotandMe/index.html">Ballot and Me</a>, and <a class="para-link" href="https://am0eba-byte.github.io/blues/">the Blues</a>) in Black Digital Humanities.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;
