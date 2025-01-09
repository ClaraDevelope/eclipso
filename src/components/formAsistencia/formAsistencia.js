import { request } from "../../api/request";
import { hideLoading, showLoading } from "../loadingButton/loadingButton";
import { openModal } from "../modalesResuesta/modalesRespuesta";
import './formAsistencia.css';


// loadingIndicator.js

// Función para crear y mostrar el indicador de carga


export const formAsistencia = (eventId) => {
  // Función para cerrar el modal
  const closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = '';  // Limpiar todo el contenido del contenedor
      modalContainer.style.display = 'none'; // También ocultar el contenedor (si no lo eliminas del DOM)
    }
  };

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  // Crear contenedor para el modal (esto asegurará que detectemos clics fuera)
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  modalOverlay.addEventListener('click', closeModal); // Cerrar modal al hacer clic fuera

  const form = document.createElement('form');
  form.id = 'form-registro';

  const h2 = document.createElement('h2');
  h2.textContent = 'Registro al Evento';
  form.appendChild(h2);

  // Nombre
  const divNombre = document.createElement('div');
  const labelNombre = document.createElement('label');
  labelNombre.setAttribute('for', 'userName'); 
  labelNombre.textContent = 'Nombre';
  const inputNombre = document.createElement('input');
  inputNombre.id = 'userName'; 
  inputNombre.type = 'text';
  inputNombre.required = true;
  divNombre.appendChild(labelNombre);
  divNombre.appendChild(inputNombre);
  form.appendChild(divNombre);

  // Email
  const divEmail = document.createElement('div');
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', 'email'); 
  labelEmail.textContent = 'Email';
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email'; 
  inputEmail.type = 'email';
  inputEmail.required = true;
  divEmail.appendChild(labelEmail);
  divEmail.appendChild(inputEmail);
  form.appendChild(divEmail);

  const button = document.createElement('button');
  button.classList.add("asistencia-button");
  button.id = 'boton-registro-evento';
  button.type = 'submit';
  button.textContent = 'Registrar';
  form.appendChild(button);

  formContainer.appendChild(form);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();

    if (!nombre || !email) {
      return; // Manejo de error ya en otro lugar
    }
    showLoading(button);

    const body = { userName: nombre, email: email };

    try {
      const response = await request(`/asistentes/eventos/${eventId}/confirmar`, 'POST', body);

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
    } finally {
      hideLoading(button);
    }
  });

  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = ''; 
    modalContainer.appendChild(modalOverlay); 
    modalContainer.appendChild(formContainer); 
    modalContainer.style.display = 'block'; 
  }

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cerrar';
  closeButton.classList.add('close-modal-button');
  closeButton.addEventListener('click', closeModal); 
  formContainer.appendChild(closeButton);

  return formContainer;
};



