import { createFooter } from './components/footer/footer';
import { createMenu } from './components/menu/menu';
import { authLinks, noAuthLinks } from './data/menuLinks';
import { createLandingPage } from './pages/landing/landing';
import { initRouter } from './routes/routes';
import './style.css';


const main = () => {
  createMenu(authLinks, noAuthLinks);
  initRouter();
  // createLandingPage()
  createFooter();
};

main();

