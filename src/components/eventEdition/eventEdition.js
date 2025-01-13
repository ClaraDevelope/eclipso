import { request } from '../../api/request';
import { createErrorModal, createSuccessModal, openModal } from '../modalesResuesta/modalesRespuesta';
import './eventEdition.css';

export const createModalEventEdition = async (eventId) => {
  const modal = document.createElement('div');
  modal.classList.add('modal-no-events');

  try {
    const event = await request(`/eventos/${eventId}`, 'GET');

    const formattedDate = new Date(event.fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-');

    modal.innerHTML = `
  <div class="event-card" id="modal-event-card">
    <h2 id="modal-title">Editar Evento</h2>
    
    <div class="event-header" id="event-header">
      <h3 class="event-title" id="title-label">Título:</h3>
      <p id="title-value">${event.titulo}</p>
      <input type="text" id="title" name="titulo" value="${event.titulo}" />
    </div>

    <div class="event-info" id="description-container">
      <h3 id="description-label">Descripción:</h3>
      <p id="description-value">${event.descripcion}</p>
      <textarea id="description" name="descripcion">${event.descripcion}</textarea>
    </div>

    <div class="event-img-container" id="image-container">
      <h3 id="image-label">Imagen:</h3>
      <img src="${event.cartel}" alt="${event.titulo}" id="image-preview" />
      <input type="file" id="image" name="cartel" accept="image/*" />
      <label for="image" class="file-upload-label" id="image-upload-label">Seleccionar Imagen</label>
    </div>

    <div class="event-info" id="date-container">
      <h3 id="date-label">Fecha:</h3>
      <p id="date-value">${new Date(event.fecha).toLocaleDateString('es-ES')}</p>
      <input type="date" id="date" name="fecha" value="${formattedDate}" />
    </div>

    <div class="event-info" id="price-container">
      <h3 id="price-label">Precio:</h3>
      <p id="price-value">${event.precio ? `${event.precio}€` : 'Gratis'}</p>
      <input type="number" id="price" name="precio" value="${event.precio || ''}" />
    </div>

    <div class="tags-event-container" id="tags-container">
      <h3 id="tags-label">Etiquetas:</h3>
      <p id="tags-value">${event.etiquetas ? event.etiquetas.join(', ') : 'No tiene etiquetas'}</p>
      <input type="text" id="tags" name="etiquetas" value="${event.etiquetas ? event.etiquetas.join(', ') : ''}" />
    </div>

    <div class="modal-footer" id="modal-footer">
      <button type="button" id="saveChangesBtn">Guardar cambios</button>
      <button type="button" id="cancelBtn">Cancelar</button>
      <button type="button" id="deleteBtn" class="delete-button">Eliminar evento</button>
    </div>
  </div>
`;

    const saveChangesButton = modal.querySelector('#saveChangesBtn');
    const cancelButton = modal.querySelector('#cancelBtn');
    const deleteButton = modal.querySelector('#deleteBtn');

    saveChangesButton.onclick = async () => {
      const evento = {
        titulo: modal.querySelector('#title').value,
        descripcion: modal.querySelector('#description').value,
        fecha: modal.querySelector('#date').value,
        precio: modal.querySelector('#price').value || 0,
        etiquetas: modal.querySelector('#tags').value.trim() || ""
      };

      console.log('Datos antes de enviar al backend:', evento);

      const fileInput = modal.querySelector('#image');
      const formData = new FormData();

      formData.append('titulo', evento.titulo);
      formData.append('descripcion', evento.descripcion);
      formData.append('fecha', evento.fecha);
      formData.append('precio', evento.precio);

      formData.append('etiquetas', evento.etiquetas);

      if (fileInput.files[0]) {
        formData.append('cartel', fileInput.files[0]);
        console.log('Archivo de imagen:', fileInput.files[0]);
      } else {
        console.log('No se seleccionó una nueva imagen. Usando imagen actual...');
      }

      console.log('FormData antes de hacer la petición:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      try {
        const data = await request(`/eventos/${eventId}/auth/${userId}`, 'PATCH', formData, headers);
        console.log(data);
        openModal('success','¡Enhorabuena!', 'Evento modificado correctamente')
      
        modal.remove();
      } catch (error) {
        openModal('error','¡Vaya!', 'Ha habido un error al modificar el evento. Inténtalo más tarde')
        console.error('Error al actualizar el evento:', error);
      }
    };

    cancelButton.onclick = () => {
      modal.remove();
    };

    deleteButton.onclick = async () => {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await request(`/eventos/${eventId}`, 'DELETE', null, headers); 
        console.log(response);
        openModal('success','¡Enhorabuena!', 'Evento eliminado correctamente')
        modal.remove();
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        openModal('error','¡Vaya!', 'Ha habido un error al eliminar el evento. Inténtalo más tarde')
      }
    };

    document.body.appendChild(modal);

  } catch (error) {
    console.error('Error al obtener los datos del evento:', error);
    createErrorModal('¡Vaya!', 'Error al obtener los datos del evento')
  }
};
