import GitHubIcon from '~icons/fa6-brands/github';
import LinkedInIcon from '~icons/fa6-brands/linkedin';
import YouTubeIcon from '~icons/fa6-brands/youtube';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/am0eba-byte" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/mia-borgia" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
        <a href="https://www.youtube.com/@mia-bo-bia" target="_blank" rel="noreferrer" aria-label="YouTube"><YouTubeIcon/></a>
      </div>
      <p>Check out my <a class="para-link" href="https://am0eba-byte.github.io/miabo-bia/index.html" target="_blank" rel="noreferrer">original portfolio site</a> from my college days, written in pure HTML & CSS!</p>
      <p>This portfolio was based upon a template designed & built by <a href="https://github.com/yujisatojr/react-portfolio-template" target="_blank" rel="noreferrer">Yuji Sato</a></p>
    </footer>
  );
}

export default Footer;
