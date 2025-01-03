import { handleRouteChange } from '../../routes/routes';
import { isAuth } from '../../utils/isAuth'; 
import './menu.css';

export const createMenu = (authLinks, noAuthLinks) => {
  const app = document.getElementById('app');
  const nav = document.createElement('nav');
  nav.classList.add('menu');

  const links = isAuth() ? authLinks : noAuthLinks;
  isAuth() ? nav.classList.add('auth') : nav.classList.remove('auth');
  links.forEach((link) => {
    const a = document.createElement('a');
    a.textContent = link;
    a.href = `/${link.toLowerCase().replace(' ', '-')}`;  // Aquí cambiamos solo el símbolo #
    nav.appendChild(a);

    if (a.textContent === 'Acceder') {
      a.classList.add('login');
    }

    // Añadimos el evento de click para manejar la navegación y el cambio de ruta
    a.addEventListener('click', (e) => {
      e.preventDefault();  // Prevenimos la acción por defecto
      const path = a.getAttribute('href');  // Obtenemos el href
      window.history.pushState({}, '', path);  // Cambiamos la URL sin recargar
      handleRouteChange();  // Actualizamos el contenido basado en la nueva URL
    });
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
