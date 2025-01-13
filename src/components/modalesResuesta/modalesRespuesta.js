import './modalesRespuesta.css'

export function createSuccessModal(title = '¡Te has registrado correctamente!', message = 'Recibirás un correo con los detalles en tu bandeja de entrada.') {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'modal-success');
  
  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.innerHTML = '✓';

  const modalTitle = document.createElement('h3');
  modalTitle.innerText = title;

  const modalMessage = document.createElement('p');
  modalMessage.innerText = message;

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');
  closeButton.innerText = 'Cerrar';
  closeButton.onclick = () => closeModal(modal);

  modal.appendChild(icon);
  modal.appendChild(modalTitle);
  modal.appendChild(modalMessage);
  modal.appendChild(closeButton);

  return modal;
}

export function createErrorModal(title = '¡Error al registrarse!', message = 'No se pudo completar tu registro. Por favor, intenta más tarde.') {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'modal-error'); 
  
  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.innerHTML = '×'; 

  const modalTitle = document.createElement('h3');
  modalTitle.innerText = title;

  const modalMessage = document.createElement('p');
  modalMessage.innerText = message;

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');
  closeButton.innerText = 'Cerrar';
  closeButton.onclick = () => closeModal(modal);

  modal.appendChild(icon);
  modal.appendChild(modalTitle);
  modal.appendChild(modalMessage);
  modal.appendChild(closeButton);

  return modal;
}

export function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.onclick = () => closeModal();
  return overlay;
}

export function openModal(modalType, title, message) {
  const overlay = createOverlay();
  document.body.appendChild(overlay);

  let modal;
  if (modalType === 'success') {
    modal = createSuccessModal(title, message); // Pasar título y mensaje
  } else if (modalType === 'error') {
    modal = createErrorModal(title, message); // Pasar título y mensaje
  }

  document.body.appendChild(modal);
  modal.classList.add('show'); // Mostrar el modal
  
  // Descomenta esto si quieres que el modal se cierre después de unos segundos
  setTimeout(() => {
    closeModal(modal);
  }, 5000);
}

export function closeModal(modal) {
  const overlay = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
  if (overlay) overlay.remove();
}

