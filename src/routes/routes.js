import { createLandingPage } from '../pages/landing/landing';
import { createLoginPage } from '../pages/login/login';

export const initRouter = () => {
  const app = document.getElementById('app');
  const routes = {
    '#landing': createLandingPage,
    '#acceder': createLoginPage,
  };

  // Detecta cambios en el hash y actualiza solo el contenido dentro del contenedor dinámico
  const handleRouteChange = () => {
    const hash = window.location.hash || '#landing';
    const pageContainer = document.querySelector('.page-container'); // Seleccionamos el contenedor de la landing

    if (pageContainer) {
      pageContainer.innerHTML = ''; // Limpiamos solo el contenido dinámico de la página
    }

    const route = routes[hash];

    if (route) {
      route(); // Cargamos la página correspondiente
    } else {
      pageContainer.innerHTML = '<h1>404 - Página no encontrada</h1>';
    }
  };


  window.addEventListener('hashchange', handleRouteChange);

  // Carga la ruta inicial
  handleRouteChange();
};
