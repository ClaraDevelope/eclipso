import './title.css'

export const createTitle = () => {
  const pageContainer = document.querySelector('.page-container');
  
  // Asegurarte de que pageContainer existe
  if (!pageContainer) {
    console.error('No se encontró el contenedor .page-container');
    return;
  }

  // Crear el contenedor del título
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');


  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerText = 'Eclipso';

  // Añadir el título al contenedor
  titleContainer.append(title);

  // Añadir el contenedor del título al pageContainer
  pageContainer.appendChild(titleContainer);
};
