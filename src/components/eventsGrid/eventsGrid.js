import { request } from '../../api/request';
import { router } from '../../routes/routes';
import { isAuth } from '../../utils/isAuth';
import { openModal } from '../modalesResuesta/modalesRespuesta';
import './eventsGrid.css';

export const EventsGridComponent = (events, filters, searchQuery) => {
  const eventsGrid = document.createElement('div');
  eventsGrid.classList.add('events-grid');
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery ? event.titulo.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesTags = filters.tags ? event.etiquetas.includes(filters.tags) : true;
    const matchesPrice = event.precio >= filters.priceRange[0] && event.precio <= filters.priceRange[1];

    return matchesSearch && matchesTags && matchesPrice;
  });

  if (filteredEvents.length === 0) {
    eventsGrid.innerHTML = '<p>No se han encontrado eventos con estos filtros.</p>';
  } else {
    filteredEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      eventCard.innerHTML = `
        <h3 class="event-title">${event.titulo}</h3>
        <div class="event-img-container">
          <img src="${event.cartel}" alt="${event.titulo}">
        </div>
        <p class="date">${new Date(event.fecha).toLocaleDateString('es-ES')}</p>
        <p class="description">${event.descripcion}</p>
        <p class="price">${event.precio ? `Precio: ${event.precio}€` : 'Gratis'}</p>
        <div class="tags-event-container">
          ${event.etiquetas
            ? event.etiquetas.map(etiqueta => `<span class="tag-badge"> • ${etiqueta}</span>`).join(' ')
            : ''}
        </div>
        <div class="button-event-container">
          <button class="asistencia-button" data-event-id="${event._id}">Quiero ir</button>
        </div>
      `;
      eventsGrid.appendChild(eventCard);
    });
  }

  eventsGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('asistencia-button')) {
      const eventId = event.target.dataset.eventId;
      handleQuieroIr(eventId);
    }
  });

  return eventsGrid;
};

const handleQuieroIr = async (eventId) => {
  if (isAuth()) {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); 
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');

    if (!token) {
      console.error("Token no encontrado en localStorage");
      return;
    }

    if (userName && email) {      
      const data = { userName, email };
      if (isAuth()) {
        data.userId = userId;
      }

      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        console.log("Headers sent:", headers);

        const response = await request(`/asistentes/eventos/${eventId}/confirmar`, 'POST', data, headers);
        
        const mensaje = response?.mensaje || 'Hubo un problema al confirmar la asistencia.';

        if (mensaje.includes('éxito')) {
          openModal('success', '¡Asistencia confirmada!', mensaje);
        } else {
          openModal('error', '¡Error al confirmar!', mensaje);
          console.error(mensaje);
        }
      } catch (error) {
        openModal('error', '¡Error de conexión!', 'No se pudo completar la acción. Por favor, intenta más tarde.');
        console.error('Error al intentar confirmar la asistencia:', error);
      }
    } else {
      openModal('error', 'Datos erróneos', 'No se encontraron datos del usuario.');
      console.error('No se encontraron datos de usuario en localStorage.');
    }
  } else {
    console.log('Usuario no autenticado. Redirigiendo a login...');
    router.navigate('/acceder');
  }
};








