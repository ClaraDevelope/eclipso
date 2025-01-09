import { request } from '../../api/request';
import { hideLoading, showLoading } from '../loadingButton/loadingButton';
import { openModal } from '../modalesResuesta/modalesRespuesta';
import './createEvent.css';

export const createEvent = (userId) => {
  const existingForm = document.querySelector('.event-form');
  if (existingForm) {
    return existingForm; s
  }
  const createEventContainer = document.createElement('div');
  createEventContainer.classList.add('create-event-container');

  const formEvent = document.createElement('form');
  formEvent.classList.add('event-form');

  // Título
  const tituloLabel = document.createElement('label');
  tituloLabel.setAttribute('for', 'titulo');
  tituloLabel.textContent = 'Título del evento';
  const tituloInput = document.createElement('input');
  tituloInput.id = 'titulo';
  tituloInput.name = 'titulo';
  tituloInput.type = 'text';
  tituloInput.required = true;

  const fechaLabel = document.createElement('label');
  fechaLabel.setAttribute('for', 'fecha');
  fechaLabel.textContent = 'Fecha del evento';
  const fechaInput = document.createElement('input');
  fechaInput.id = 'fecha';
  fechaInput.name = 'fecha';
  fechaInput.type = 'datetime-local';
  fechaInput.required = true;

  const ubicacionLabel = document.createElement('label');
  ubicacionLabel.setAttribute('for', 'ubicacion');
  ubicacionLabel.textContent = 'Ubicación del evento';
  const ubicacionInput = document.createElement('input');
  ubicacionInput.id = 'ubicacion';
  ubicacionInput.name = 'ubicacion';
  ubicacionInput.type = 'text';
  ubicacionInput.required = true;


  const descripcionLabel = document.createElement('label');
  descripcionLabel.setAttribute('for', 'descripcion');
  descripcionLabel.textContent = 'Descripción del evento';
  const descripcionInput = document.createElement('textarea');
  descripcionInput.id = 'descripcion';
  descripcionInput.name = 'descripcion';
  descripcionInput.rows = '4';
  descripcionInput.cols = '50';


  const precioLabel = document.createElement('label');
  precioLabel.setAttribute('for', 'precio');
  precioLabel.textContent = 'Precio del evento';
  const precioInput = document.createElement('input');
  precioInput.id = 'precio';
  precioInput.name = 'precio';
  precioInput.type = 'number';
  precioInput.min = '0';
  precioInput.value = '0';

  const cartelLabel = document.createElement('label');
  cartelLabel.setAttribute('for', 'cartel');
  cartelLabel.textContent = 'Imagen del evento (opcional)';
  const cartelInput = document.createElement('input');
  cartelInput.id = 'cartel';
  cartelInput.name = 'cartel';
  cartelInput.type = 'file';
  cartelInput.accept = 'image/*';
cartelLabel.classList.add('file-upload-label');

const fileInfo = document.createElement('span');
fileInfo.classList.add('file-upload-info');
fileInfo.textContent = 'Ningún archivo seleccionado';


cartelInput.addEventListener('change', () => {
  fileInfo.textContent = cartelInput.files.length
    ? cartelInput.files[0].name
    : 'Ningún archivo seleccionado';
});


  const etiquetasLabel = document.createElement('label');
  etiquetasLabel.setAttribute('for', 'etiquetas');
  etiquetasLabel.textContent = 'Etiquetas (opcional)';
  const etiquetasInput = document.createElement('input');
  etiquetasInput.id = 'etiquetas';
  etiquetasInput.name = 'etiquetas';
  etiquetasInput.type = 'text';
  etiquetasInput.placeholder = 'Agregar etiquetas separadas por comas';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Crear Evento';

  formEvent.appendChild(tituloLabel);
  formEvent.appendChild(tituloInput);
  formEvent.appendChild(fechaLabel);
  formEvent.appendChild(fechaInput);
  formEvent.appendChild(ubicacionLabel);
  formEvent.appendChild(ubicacionInput);
  formEvent.appendChild(descripcionLabel);
  formEvent.appendChild(descripcionInput);
  formEvent.appendChild(precioLabel);
  formEvent.appendChild(precioInput);
  formEvent.appendChild(cartelLabel);
  formEvent.appendChild(cartelInput);
  formEvent.appendChild(fileInfo);
  formEvent.appendChild(etiquetasLabel);
  formEvent.appendChild(etiquetasInput);
  formEvent.appendChild(submitButton);

  formEvent.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(formEvent); 
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    showLoading(submitButton)
    try {
      const response = await request(`/auth/${userId}/create`, 'POST', formData, headers);
      console.log('Evento creado con éxito:', response);
      openModal('success', title ='¡Evento creado con éxito!', message='¡Enhorabuena!')
    } catch (error) {
      console.error('Error al crear el evento:', error);
      openModal('error', title ='Error al crear el evento', message='Inténtalo más tarde')
    }finally{
      hideLoading(submitButton)
    }
  });

  createEventContainer.appendChild(formEvent);

  return createEventContainer;
};
