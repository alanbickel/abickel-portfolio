import LinkedInIcon from '~icons/fa6-brands/linkedin';
import '../assets/styles/Main.scss';
import TornadoSmallOutline from '~icons/solar/tornado-small-outline'
import HandsPraying from '~icons/fa6-solid/hands-praying';
import HatWizard from '~icons/fa6-solid/hat-wizard';
import Chip from './Chip';


function Main() {

  return (
    <div class="container">
      <div class="about-section">
        <div class="image-wrapper">
          {/* <img src={avatarImage} alt="Avatar" /> */}
        </div>
        <div class="content">

          <h1>Alan Bickel</h1>

          <p> Senior | Lead Software Engineer</p>
          <div>
            <Chip icon={<HatWizard />} label="Pathfinder" />
            <Chip icon={<TornadoSmallOutline />} label="Chaos Coordinator" />
            <Chip icon={<HandsPraying />} label="Developer Evangelist" />
          </div>

          <div class="social_icons">
            <a href="https://www.linkedin.com/in/alan-bickel" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
          <div class="mobile_social_icons">
            <a href="https://www.linkedin.com/in/alan-bickel" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
