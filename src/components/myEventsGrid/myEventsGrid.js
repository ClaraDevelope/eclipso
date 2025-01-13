import { request } from '../../api/request';
import { createModalEventEdition } from '../eventEdition/eventEdition';
import './myEventsGrid.css';


export const createMyEventsGrid = async (userId) => {
  const pageContainer = document.querySelector('.page-container');
  const eventsGrid = document.createElement('div');
  eventsGrid.classList.add('events-grid');
  eventsGrid.id = 'my-events-grid';

  try {
    const userData = await request(`/auth/${userId}`, 'GET');
    console.log(userData.eventosOrganizados);
    
    userData.eventosOrganizados.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      
      eventCard.innerHTML = `
      <div class="event-header">
        <h3 class="event-title">${event.titulo}</h3>
        <button class="edit-event-btn" data-event-id="${event._id}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
          </svg>
          <span class="tooltip-text">Editar</span>
        </button>
      </div>
      <div class="event-img-container">
        <img src="${event.cartel}" alt="${event.titulo}">
      </div>
      <p class="date">${new Date(event.fecha).toLocaleDateString('es-ES')}</p>
      <p class="description">${event.descripcion}</p>
      <p class="price" id="precio">${event.precio ? `Precio: ${event.precio}€` : 'Gratis'}</p>
      ${event.etiquetas && event.etiquetas.length > 0 && event.etiquetas[0] !== '' ?         
        `<div class="tags-event-container">
          ${event.etiquetas.map(etiqueta => `<span class="tag-badge"> • ${etiqueta}</span>`).join(' ')}
        </div>` 
        : ''}
    `;
     
      const editButton = eventCard.querySelector('.edit-event-btn');
      editButton.addEventListener('click', () => {
        const eventId = editButton.getAttribute('data-event-id');
        console.log(eventId);
        
        createModalEventEdition(eventId);
      });

      eventsGrid.appendChild(eventCard);
    });
    
    return eventsGrid;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    pageContainer.innerHTML = '<h1>Hubo un problema al cargar los datos del usuario.</h1>';
  }
};




