import { isAuth } from '../../utils/isAuth';
import './menu.css';

export const createMenu = (authLinks, noAuthLinks) => {
  const app = document.getElementById('app');
  const nav = document.createElement('nav');
  nav.classList.add('menu');

  const links = isAuth() ? authLinks : noAuthLinks;
  links.forEach((link) => {
    const a = document.createElement('a');
    a.textContent = link;
    a.href = `#${link.toLowerCase().replace(' ', '-')}`;
    nav.appendChild(a);

    if (a.textContent === 'Acceder') {
      a.classList.add('login');
    }
  });

  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  app.appendChild(hamburger);
  app.appendChild(nav);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
      hamburger.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
      hamburger.classList.remove('scrolled');
    }
  });
};
