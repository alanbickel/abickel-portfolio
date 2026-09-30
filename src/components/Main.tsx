import LinkedInIcon from '~icons/fa6-brands/linkedin';
import '../assets/styles/Main.scss';
import Compass from '~icons/fa6-solid/compass';
import ArrowsToCircle from '~icons/fa6-solid/arrows-to-circle';
import HandHoldingHeart from '~icons/fa6-solid/hand-holding-heart';


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
            <li><Compass aria-hidden="true" />Pathfinder</li>
            <li><ArrowsToCircle aria-hidden="true" />Chaos Coordinator</li>
            <li><HandHoldingHeart aria-hidden="true" />Developer Evangelist</li>
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
