import { request } from '../../api/request';
import './myFavoriteEvents.css'

export const createMyFavoriteEvents = async (userId) => {
  const pageContainer = document.querySelector('.page-container');

  const eventsGrid = document.createElement('div');
  eventsGrid.classList.add('events-grid');
  eventsGrid.id = 'my-favorite-events-grid';

  try {
    const userData = await request(`/auth/${userId}`, 'GET');
    console.log(userData.eventosFavoritos);

    if (userData.eventosFavoritos.length === 0) {
      const modal = document.createElement('div');
      modal.classList.add('modal-no-events');
      modal.innerHTML = `
        <div class="modal-no-events-content">
          <p>Aún no tienes eventos favoritos</p>
        </div>
      `;
      pageContainer.appendChild(modal);

      // Eliminar el modal después de 3 segundos
      setTimeout(() => {
        modal.remove();
      }, 3000); // 3 segundos

      return null; // No se retorna nada si no hay eventos
    } else {
      userData.eventosFavoritos.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
          <h3 class="event-title">${event.titulo}</h3>
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
        eventsGrid.appendChild(eventCard);
      });
      

      return eventsGrid; // Si hay eventos, se retorna el grid
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    pageContainer.innerHTML = '<h1>Hubo un problema al cargar los datos del usuario.</h1>';
  }
};

