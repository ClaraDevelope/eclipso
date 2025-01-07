import { request } from '../../api/request';
import { SearchAndFilterComponent } from '../../components/searchAndFilter/searchAndFilter';
import './explora.css';

export const createExploraPage = async () => {
  const app = document.querySelector('#app');
  let pageContainer = document.querySelector('.page-container');
  if (!pageContainer) {
    pageContainer = document.createElement('div');
    pageContainer.classList.add('page-container');
    app.appendChild(pageContainer);
  }

  let searchQuery = '';
  let filters = {
    tags: '', // Solo usamos 'tags' aquí
    priceRange: [0, 1000],
  };

  // Función para obtener las etiquetas únicas de los eventos
  const fetchTags = async () => {
    try {
      const response = await request('/eventos');
      if (Array.isArray(response)) {
        const tags = new Set();
        response.forEach(event => {
          event.etiquetas.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
      } else {
        console.error('La respuesta no es un array', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  // Función que maneja la búsqueda
  const handleSearch = (query) => {
    searchQuery = query.trim();
    fetchFilteredEvents();  // Llamamos a la función que filtra los eventos
  };

  // Función que maneja los cambios en los filtros
  const handleFilterChange = (name, value) => {
    filters[name] = value;
    fetchFilteredEvents();  // Llamamos a la función que filtra los eventos
  };

  // Función que filtra los eventos por búsqueda, tags y precio
  const fetchFilteredEvents = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        tags: filters.tags || '',  // Filtro por etiquetas
        costMin: filters.priceRange[0],
        costMax: filters.priceRange[1],
      });

      console.log('Filtros aplicados:', filters);  // Depuración

      // Aquí pedimos los eventos ya filtrados según los parámetros
      const response = await request(`/eventos/filtros?${queryParams.toString()}`);
      if (Array.isArray(response)) {
        console.log('Eventos recibidos:', response);  // Depuración
        const tags = await fetchTags();
        renderEvents(response, tags);  // Renderizamos los eventos filtrados
      } else {
        console.error('La respuesta de eventos filtrados no es un array', response);
      }
    } catch (error) {
      console.error('Error fetching filtered events:', error);
    }
  };

  // Función que renderiza los eventos en la página
  const renderEvents = (events, tags) => {
    const eventsGrid = document.createElement('div');
    eventsGrid.classList.add('events-grid');

    const filteredEvents = events.filter(event => {
      // Filtro por búsqueda
      const matchesSearch = searchQuery ? event.titulo.toLowerCase().includes(searchQuery.toLowerCase()) : true;

      // Filtro por etiquetas
      const matchesTags = filters.tags ? event.etiquetas.includes(filters.tags) : true;

      // Filtro por precio
      const matchesPrice = event.precio >= filters.priceRange[0] && event.precio <= filters.priceRange[1];

      return matchesSearch && matchesTags && matchesPrice;
    });

    console.log('Eventos filtrados:', filteredEvents);  // Depuración

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
          <p class="price">${event.precio ? `€${event.precio}` : 'Gratis'}</p>
        `;
        eventsGrid.appendChild(eventCard);
      });
    }

    pageContainer.innerHTML = '';
    const searchAndFilterNode = SearchAndFilterComponent(handleSearch, handleFilterChange, tags);
    if (searchAndFilterNode instanceof Node) {
      pageContainer.appendChild(searchAndFilterNode);
      pageContainer.appendChild(eventsGrid);
    } else {
      console.error('El SearchAndFilterComponent no devolvió un nodo válido.');
    }
  };

  // Obtenemos las etiquetas y cargamos los eventos filtrados
  const tags = await fetchTags();
  fetchFilteredEvents();
};

