import './loading.css';

export const createLoadingSpinner = () => {
  const app = document.getElementById('app');

  let loaderContainer = document.getElementById('loader-container');
  if (!loaderContainer) {
    loaderContainer = document.createElement('div');
    loaderContainer.id = 'loader-container';
    loaderContainer.classList.add('loader-container');

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loaderContainer.appendChild(spinner);
    app.appendChild(loaderContainer);
  }
};

export const removeLoadingSpinner = () => {
  const loaderContainer = document.getElementById('loader-container');
  if (loaderContainer) {
    loaderContainer.remove();
  }
};
