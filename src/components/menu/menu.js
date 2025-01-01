import { isAuth } from '../../utils/isAuth';
import './menu.css';

export const createMenu = (authLinks, noAuthLinks) => {
  const app = document.getElementById('app');
  const nav = document.createElement('nav');
  nav.classList.add('menu');

  // Crear enlaces según el estado de autenticación
  const links = isAuth() ? authLinks : noAuthLinks;
  links.forEach(link => {
    const a = document.createElement('a');
    a.textContent = link;
    a.href = `#${link.toLowerCase().replace(' ', '-')}`;
    nav.appendChild(a);
  });

  // Crear el botón de menú hamburguesa para móviles
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open'); // Toggle para abrir/cerrar el menú
  });

  app.appendChild(hamburger); // Añadir el botón hamburguesa a la página
  app.appendChild(nav);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
};
