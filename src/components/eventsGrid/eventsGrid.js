import { request } from '../../api/request';
import { isAuth } from '../../utils/isAuth';
import { formAsistencia } from '../formAsistencia/formAsistencia';
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
  <div class="favorite-container">
    <svg class="favorite-icon" data-event-id="${event._id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Añadir a favoritos">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color: #29253a; stop-opacity: 1" />
      <stop offset="32%" style="stop-color: #44107a; stop-opacity: 1" />
      <stop offset="67%" style="stop-color: #ff1361; stop-opacity: 1" />
      <stop offset="100%" style="stop-color: #fff800; stop-opacity: 1" />
    </linearGradient>
  </defs>
  <path class="heart-outline" fill="none" stroke="currentColor" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  <path class="heart-filled" fill="url(#gradient)" style="opacity: 0;" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>
  </div>
  <p class="date">${new Date(event.fecha).toLocaleDateString('es-ES')}</p>
  <p class="description">${event.descripcion}</p>
  <p class="price">${event.precio ? `Precio: ${event.precio}€` : 'Gratis'}</p>
      ${event.etiquetas && event.etiquetas.length > 0 && event.etiquetas[0] !== '' ?         
        `<div class="tags-event-container">
          ${event.etiquetas.map(etiqueta => `<span class="tag-badge"> • ${etiqueta}</span>`).join(' ')}
        </div>` 
        : ''}
  <div class="button-event-container">
    <button class="asistencia-button" data-event-id="${event._id}">Quiero ir</button>
  </div>
`;

      const heartIcon = eventCard.querySelector('.favorite-icon');
      const filledPath = heartIcon.querySelector('.heart-filled');
      const isFavorite = localStorage.getItem(event._id) === 'true';

      if (isFavorite) {
        heartIcon.classList.add('liked');
        filledPath.style.opacity = 1;
      }

      eventsGrid.appendChild(eventCard);
    });
    setTimeout(initializeFavorites, 0);
  }

  eventsGrid.addEventListener('click', (event) => {
    const heartIcon = event.target.closest('.favorite-icon');
    
    if (heartIcon) {
      const eventId = heartIcon.dataset.eventId;
      toggleFavorite(heartIcon, eventId); 
    }

    if (event.target.classList.contains('asistencia-button')) {
      const eventId = event.target.dataset.eventId;
      handleQuieroIr(eventId);
    }
  });

  return eventsGrid;
};

const toggleFavorite = async (icon, eventId) => {
  const filledPath = icon.querySelector('.heart-filled');
  
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId'); 

  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const body = {
    userId, 
    eventId
  };

  try {
    const response = await request(`/auth/${eventId}/favourite`, 'POST', body, headers);
    
    if (response.message === 'Evento agregado a la lista de favoritos') {
      icon.classList.add('liked');
      filledPath.style.opacity = 1; 
      localStorage.setItem(`${userId}-${eventId}`, 'true'); 
      openModal('success', 'Listo!', response.message);
    } else if (response.message === 'Evento eliminado de la lista de favoritos') {
      icon.classList.remove('liked');  
      filledPath.style.opacity = 0;    
      localStorage.removeItem(`${userId}-${eventId}`);
      openModal('success', 'Listo!', response.message);
    }
  } catch (error) {
    console.error('Error al actualizar favorito:', error);
    openModal('error', 'Ha habido un error', 'Hubo un error al procesar tu solicitud. Inténtalo de nuevo.');
  }
};


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente cargado');
  initializeFavorites();
});

export const initializeFavorites = async () => {
  const allIcons = document.querySelectorAll('.favorite-icon');

  if (allIcons.length === 0) {
    // console.error('No se encontraron iconos de favoritos.');
    return;
  }
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('No se encontró el userId en el localStorage');
    return;
  }

  allIcons.forEach(icon => {
    const eventId = icon.getAttribute('data-event-id');
    const isFavorite = localStorage.getItem(`${userId}-${eventId}`) === 'true'; 
    const filledPath = icon.querySelector('.heart-filled');

    if (isFavorite) {
      icon.classList.add('liked');
      if (filledPath) filledPath.style.opacity = 1;
    } else {
      icon.classList.remove('liked');
      if (filledPath) filledPath.style.opacity = 0;
    }
  });
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
    console.log('Usuario no autenticado');
    const formContainer = formAsistencia(eventId); // Crear formulario
    
    // Intentamos obtener el contenedor modal-container
    let modalContainer = document.getElementById('modal-container');
    
    // Si no existe, lo creamos
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'modal-container';
      document.body.appendChild(modalContainer); // Añadimos al body o donde necesites
    }

    modalContainer.innerHTML = ''; // Limpiamos cualquier contenido previo
    modalContainer.appendChild(formContainer); // Añadimos el formulario
  }
};
;










