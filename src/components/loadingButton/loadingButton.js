import './loadingButton.css'

export const showLoading = (button) => {
  // Deshabilitamos el botón y agregamos el spinner
  button.disabled = true;
  const loadingSpinner = document.createElement('div');
  loadingSpinner.classList.add('loading-spinner');
  button.appendChild(loadingSpinner);
};

// Función para ocultar el indicador de carga
export const hideLoading = (button) => {
  // Rehabilitamos el botón y eliminamos el spinner
  button.disabled = false;
  const loadingSpinner = button.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
};