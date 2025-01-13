import Navigo from 'navigo';
import { createExploraPage } from '../pages/explora/explora';
import { createLandingPage } from '../pages/landing/landing';
import { createLoginPage } from '../pages/login/login';
import { createRegisterPage } from '../pages/register/register';
import { logout } from '../utils/logout';
import { createMyEventsPage } from '../pages/myEvents/myEvents';
import { initializeFavorites } from '../components/eventsGrid/eventsGrid';
import { isAuth } from '../utils/isAuth';
import { createProfilePage } from '../pages/profile/profile';

const app = document.getElementById('app');
const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
app.appendChild(pageContainer);

export const router = new Navigo('/', { hash: true });

router
  .on('/', () => {
    if (isAuth()) { 
      renderPage(createExploraPage);
    } else {
      renderPage(createLandingPage);
    }
  })
  .on('/comunidad', () => {
    renderPage(createLandingPage);
  })
  .on('/acceder', () => {
    renderPage(createLoginPage);
  })
  .on('/registro', () => {
    renderPage(createRegisterPage);
  })
  .on('/salir', () => {
    logout();
    renderPage(createLandingPage)
  })
  .on('/explora', () => {
    renderPage(createExploraPage);
  })
  .on('/mis-eventos', () => {
    if (isAuth()) { 
      renderPage(createMyEventsPage);
    } else {
      renderPage(createLandingPage);
    }
   
  })

  .on('/perfil', () => {
    if (isAuth()) { 
      renderPage(createProfilePage);
    } else {
      renderPage(createLandingPage);
    }

  })
  .on('*', () => {
    if (isAuth()) { // También aquí
      renderPage(() => {
        initializeFavorites();
      });
    }
  })
  .notFound(() => {
    pageContainer.innerHTML = '<h1>404 - Página no encontrada</h1>';
  });



function renderPage(pageFunction) {
  const pageContainer = document.querySelector('.page-container');
  if (!pageContainer) {
    console.error('No se encontró el contenedor de la página');
    return;
  }
  pageContainer.innerHTML = ''; 
  pageFunction(); 
  router.updatePageLinks(); 
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
