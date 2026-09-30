import { render } from 'solid-js/web';
import '@fontsource-variable/roboto/wght.css';
import '@fontsource-variable/roboto/wght-italic.css';
import './index.scss';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
