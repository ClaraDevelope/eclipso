import Navigo from 'navigo';
import { createExploraPage } from '../pages/explora/explora';
import { createLandingPage } from '../pages/landing/landing';
import { createLoginPage } from '../pages/login/login';
import { createRegisterPage } from '../pages/register/register';
import { logout } from '../utils/logOut';

const app = document.getElementById('app');
const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
app.appendChild(pageContainer);

export const router = new Navigo('/', { hash: true });

router
  .on('/', () => {
    renderPage(createLandingPage);
  })
  .on('/comunidad', () => {
    renderPage(createLandingPage)
  })
  .on('/acceder', () => {
    renderPage(createLoginPage);
  })
  .on('/registro', () => {
    renderPage(createRegisterPage);
  })
  .on('/salir', () => {
    logout();
  })
  .on('/explora', () => {
    renderPage(createExploraPage);
  })
  .notFound(() => {
    pageContainer.innerHTML = '<h1>404 - Página no encontrada</h1>';
  });

function renderPage(pageFunction) {
  const pageContainer = document.querySelector('.page-container');
  pageContainer.innerHTML = '';
  pageFunction();
  router.updatePageLinks(); // Actualizar los enlaces después de cada render
}


// import { createExploraPage } from '../pages/explora/explora';
// import { createLandingPage } from '../pages/landing/landing';
// import { createLoginPage } from '../pages/login/login';
// import { createRegisterPage } from '../pages/register/register';
// import { logout } from '../utils/logOut';

// export const handleRouteChange = () => {
//   const app = document.getElementById('app');
//   const routes = {
//     '/landing': createLandingPage,
//     '/acceder': createLoginPage,
//     '/registro': createRegisterPage,
//     '/salir': logout,
//     '/explora': createExploraPage
//   };

//   let pageContainer = document.querySelector('.page-container');

//   if (!pageContainer) {
//     pageContainer = document.createElement('div');
//     pageContainer.classList.add('page-container');
//     app.appendChild(pageContainer);
//   }

//   pageContainer.innerHTML = ''; // Limpiamos el contenido dinámico

//   const path = window.location.pathname;  // Tomamos el pathname de la URL
//   const route = routes[path];

//   if (route) {
//     route(); // Cargar la página correspondiente
//   } else {
//     pageContainer.innerHTML = '<h1>404 - Página no encontrada</h1>';
//   }
// };

// export const initRouter = () => {
//   // Cargar la ruta inicial (si la página se carga por primera vez)
//   if (window.location.pathname === '/') {
//     window.history.replaceState({}, '', '/landing');  // Forzar la URL correcta para la página inicial
//   }

//   // Añadir un listener para los cambios en la URL (cuando se navega usando el navegador)
//   window.addEventListener('popstate', handleRouteChange);

//   handleRouteChange();  // Llamamos a la función para cargar la ruta inicial
// };
