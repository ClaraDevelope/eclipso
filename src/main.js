import { createFooter } from './components/footer/footer';
import { createMenu } from './components/menu/menu';
import { authLinks, noAuthLinks } from './data/menuLinks';
import { router } from './routes/routes';
import './style.css';

const main = () => {
  router.resolve()
  createMenu(authLinks, noAuthLinks);
  createFooter();

};

main();

