import LinkedInIcon from '~icons/fa6-brands/linkedin';
import '../assets/styles/Main.scss';
import TornadoSmall from '~icons/solar/tornado-small-bold';
import HandsPraying from '~icons/fa6-solid/hands-praying';
import HatWizard from '~icons/fa6-solid/hat-wizard';


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
          <ul class="hero-traits">
            <li><HatWizard aria-hidden="true" />Pathfinder</li>
            <li><TornadoSmall aria-hidden="true" />Chaos Coordinator</li>
            <li><HandsPraying aria-hidden="true" />Developer Evangelist</li>
          </ul>

          <div class="social_icons">
            <a href="https://www.linkedin.com/in/alan-bickel" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
