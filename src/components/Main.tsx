import GitHubIcon from '~icons/fa6-brands/github';
import LinkedInIcon from '~icons/fa6-brands/linkedin';
import YouTubeIcon from '~icons/fa6-brands/youtube';
import '../assets/styles/Main.scss';
import avatarImage from '../assets/images/me-circle.png';

function Main() {

  return (
    <div class="container">
      <div class="about-section">
        <div class="image-wrapper">
          <img src={avatarImage} alt="Avatar" />
        </div>
        <div class="content">
          <div class="social_icons">
            <a href="https://github.com/am0eba-byte" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/mia-borgia" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
            <a href="https://www.youtube.com/@mia-bo-bia" target="_blank" rel="noreferrer" aria-label="YouTube"><YouTubeIcon/></a>
          </div>
          <h1>Mia Borgia</h1>
          <p>Full Stack Engineer</p>

          <div class="mobile_social_icons">
            <a href="https://github.com/am0eba-byte" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/mia-borgia" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
            <a href="https://www.youtube.com/@mia-bo-bia" target="_blank" rel="noreferrer" aria-label="YouTube"><YouTubeIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
