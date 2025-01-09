import { request } from '../../api/request';
import './myEventsGrid.css'

export const createMyEventsGrid = async (userId) => {
  const pageContainer = document.querySelector('.page-container');
  const eventsGrid = document.createElement('div');
  eventsGrid.classList.add('events-grid');
  eventsGrid.id='my-events-grid'
try {
    const userData = await request(`/auth/${userId}`, 'GET');
    console.log(userData.eventosOrganizados);
    
      userData.eventosOrganizados.forEach(event => {
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
          <div class="tags-event-container">
            ${event.etiquetas
              ? event.etiquetas.map(etiqueta => `<span class="tag-badge"> • ${etiqueta}</span>`).join(' ')
              : ''}
          </div>
        `;
        eventsGrid.appendChild(eventCard);
  });
         
    return eventsGrid;

} catch (error) {
  console.error('Error al obtener los datos del usuario:', error);
  pageContainer.innerHTML = '<h1>Hubo un problema al cargar los datos del usuario.</h1>';
}
 
};