import { request } from '../../api/request';
import { createEvent } from '../../components/createEvent/createEvent';
import { createMyEventsGrid } from '../../components/myEventsGrid/myEventsGrid';
import { createMyFavoriteEvents } from '../../components/myFavoriteEvents/myFavoriteEvents';
import './myEvents.css';

export const createMyEventsPage = async () => {
  const pageContainer = document.querySelector('.page-container');
  pageContainer.innerHTML = ''; 
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('No se encontró el userId en el localStorage');
    pageContainer.innerHTML = '<h1>No estás autenticado</h1>';
    return;
  }
  try {

    const userData = await request(`/auth/${userId}`, 'GET');
    
    const container = document.createElement('div');
    container.classList.add('my-events-container');

    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar-container');
    
    const avatarImage = document.createElement('img');
    avatarImage.classList.add('user-avatar');
    avatarImage.src = userData.img || 'usuario-avatar.webp';
    avatarImage.alt = 'Avatar de Usuario';
    
    avatarContainer.appendChild(avatarImage);

    const greeting = document.createElement('h3');
    greeting.textContent = `Hola ${userData.userName}, aquí puedes gestionar tus eventos.`;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const createEventButton = document.createElement('button');
    createEventButton.textContent = 'Crear Evento';
    createEventButton.classList.add('my-events-button');
    createEventButton.addEventListener('click', () => {
      console.log('Crear un evento');

      const existingForm = document.querySelector('.create-event-container');
      if (existingForm) {
        existingForm.remove(); 
      }
      const existingEventsGrid = document.querySelector('#my-events-grid');
      if (existingEventsGrid) {
        existingEventsGrid.remove();
      } 
      const existingEventsFavoriteGrid = document.querySelector('#my-favorite-events-grid');
      if (existingEventsFavoriteGrid) {
        existingEventsFavoriteGrid.remove();
      } 
      // const existingTitle = document.querySelector('#title-no-events');
      // if (existingTitle) {
      //   existingTitle.remove();
      // }
      pageContainer.appendChild(createEvent(userId));
    });
    

    const myEventsButton = document.createElement('button');
    myEventsButton.textContent = ' Mis Eventos';
    myEventsButton.classList.add('my-events-button');
    myEventsButton.addEventListener('click', async () => {
      console.log('Ver mis eventos organizados');
      const existingForm = document.querySelector('.event-form');
      if (existingForm) {
        existingForm.remove(); 
      }     
      try {
        const existingEventsGrid = document.querySelector('#my-events-grid');
        if (existingEventsGrid) {
          existingEventsGrid.remove();
        } 
        const existingEventsFavoriteGrid = document.querySelector('#my-favorite-events-grid');
        if (existingEventsFavoriteGrid) {
          existingEventsFavoriteGrid.remove();
        } 
        const existingMyFavoriteEventsTitle = document.querySelector('.title-no-events');
        if(existingMyFavoriteEventsTitle){
          existingMyFavoriteEventsTitle.remove();
        }
        // const existingTitle = document.querySelector('#title-no-events');
        // if (existingTitle) {
        //   existingTitle.remove();
        // }
        const eventsGrid = await createMyEventsGrid(userId);
        pageContainer.appendChild(eventsGrid);
      } catch (error) {
        console.error('Error al cargar la cuadrícula de eventos:', error);
      }
    });
    

    const favoriteEventsButton = document.createElement('button');
    favoriteEventsButton.textContent = 'Eventos Favoritos';
    favoriteEventsButton.classList.add('my-events-button');
    favoriteEventsButton.addEventListener('click', async () => {
      console.log('Ver mis eventos favoritos');
      // const existingTitle = document.querySelector('#title-no-events');
      // if (existingTitle) {
      //   existingTitle.remove();
      // } 
      try {
        const existingEventsGrid = document.querySelector('#my-events-grid');
        if (existingEventsGrid) {
          existingEventsGrid.remove();
        }
        const existingForm = document.querySelector('.event-form');
        if (existingForm) {
          existingForm.remove();
        }
        const existingEventsFavoriteGrid = document.querySelector('#my-favorite-events-grid');
        if (existingEventsFavoriteGrid) {
          existingEventsFavoriteGrid.remove();
        } 
        const eventsGrid = await createMyFavoriteEvents(userId);
        if (eventsGrid) {
          pageContainer.appendChild(eventsGrid);
        }
      } catch (error) {
        console.error('Error al cargar la cuadrícula de eventos:', error);
      }
    });



    buttonsContainer.appendChild(createEventButton);
    buttonsContainer.appendChild(myEventsButton);
    buttonsContainer.appendChild(favoriteEventsButton);

    container.appendChild(avatarContainer);
    container.appendChild(greeting);
    container.appendChild(buttonsContainer);

    pageContainer.appendChild(container);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    pageContainer.innerHTML = '<h1>Hubo un problema al cargar los datos del usuario.</h1>';
  }
};
