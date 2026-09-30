import { createEffect, createSignal, For, on, onCleanup, onMount, Show } from "solid-js";
import DarkModeIcon from '~icons/ic/baseline-dark-mode';
import LightModeIcon from '~icons/ic/baseline-light-mode';
import ListIcon from '~icons/ic/baseline-list';
import MenuIcon from '~icons/ic/baseline-menu';
import '../assets/styles/Navigation.scss';

const navItems = [['Overview', 'overview'], ['Skills', 'skills'], ['Experience', 'experience'], ['Contact', 'contact']];

type NavigationProps = {
  mode: 'dark' | 'light';
  onModeChange: () => void;
};

function Navigation(props: NavigationProps) {
  const [mobileOpen, setMobileOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  let navbar!: HTMLElement;
  let menuToggle!: HTMLButtonElement;
  let drawer!: HTMLElement;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  onMount(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > navbar.clientHeight);
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  // Move focus into the drawer when it opens, and back to the menu button when it closes.
  createEffect(on(mobileOpen, (open) => {
    if (open) {
      drawer.querySelector('button')?.focus();
    } else {
      menuToggle.focus({ preventScroll: true });
    }
  }, { defer: true }));

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav id="navigation" ref={navbar} class="app-bar navbar-fixed-top" classList={{ scrolled: scrolled() }}>
        <div class="navigation-bar">
          <button
            ref={menuToggle}
            class="menu-toggle"
            aria-label="open drawer"
            aria-expanded={mobileOpen()}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </button>
          <button
            class="mode-toggle"
            aria-label={props.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => props.onModeChange()}
          >
            <Show when={props.mode === 'dark'} fallback={<DarkModeIcon />}>
              <LightModeIcon />
            </Show>
          </button>
          <div class="nav-links">
            <For each={navItems}>
              {(item) => (
                <button onClick={() => scrollToSection(item[1])}>
                  {item[0]}
                </button>
              )}
            </For>
          </div>
        </div>
      </nav>
      <div class="drawer-backdrop" classList={{ open: mobileOpen() }} onClick={handleDrawerToggle} />
      <aside
        ref={drawer}
        class="drawer navigation-bar-responsive"
        classList={{ open: mobileOpen() }}
        aria-label="Menu"
        onClick={handleDrawerToggle}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMobileOpen(false);
        }}
      >
        <p class="mobile-menu-top"><ListIcon />Menu</p>
        <hr class="drawer-divider" />
        <ul>
          <For each={navItems}>
            {(item) => (
              <li>
                <button onClick={() => scrollToSection(item[1])}>
                  <span>{item[0]}</span>
                </button>
              </li>
            )}
          </For>
        </ul>
      </aside>
    </>
  );
}

export default Navigation;
