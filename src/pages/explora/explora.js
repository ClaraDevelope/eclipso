import { request } from '../../api/request';
import { EventsGridComponent } from '../../components/eventsGrid/eventsGrid';
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
    tags: '',
    priceRange: [0, 1000],
  };

  const fetchTags = async () => {
    try {
      const response = await request('/eventos/');
      if (Array.isArray(response)) {
        const tags = new Set();
        response.forEach(event => event.etiquetas.forEach(tag => tags.add(tag)));
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

  const handleSearch = (query) => {
    searchQuery = query.trim();
    fetchFilteredEvents();
  };

  const handleFilterChange = (name, value) => {
    filters[name] = value;
    fetchFilteredEvents();
  };

  const fetchFilteredEvents = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        tags: filters.tags || '',
        costMin: filters.priceRange[0],
        costMax: filters.priceRange[1],
      });

      const response = await request(`/eventos/filtros?${queryParams.toString()}`);
      if (Array.isArray(response)) {
        const tags = await fetchTags();
        renderPage(response, tags);
      } else {
        console.error('La respuesta de eventos filtrados no es un array', response);
      }
    } catch (error) {
      console.error('Error fetching filtered events:', error);
    }
  };

  const renderPage = (events, tags) => {
    pageContainer.innerHTML = '';
    const searchAndFilterNode = SearchAndFilterComponent(handleSearch, handleFilterChange, tags);
    if (searchAndFilterNode instanceof Node) {
      pageContainer.appendChild(searchAndFilterNode);
      const eventsGrid = EventsGridComponent(events, filters, searchQuery); 
      pageContainer.appendChild(eventsGrid);
    } else {
      console.error('El SearchAndFilterComponent no devolvió un nodo válido.');
    }
  };
  const tags = await fetchTags();
  fetchFilteredEvents();
};

