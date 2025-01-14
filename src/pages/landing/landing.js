import { createFaq } from '../../components/FaQ/FaQ';
import { createTestimonials } from '../../components/testimonials/testimonials';
import { createTitle } from '../../components/title/title';
import { faqs } from '../../data/Faqs';
import './landing.css';

export const createLandingPage = () => {
  const app = document.getElementById('app');
  let pageContainer = document.querySelector('.page-container');
  if (!pageContainer) {
    pageContainer = document.createElement('div');
    pageContainer.classList.add('page-container');
    app.appendChild(pageContainer);
  } else {
    const existingGrid = pageContainer.querySelector('.grid');
    if (existingGrid) {
      existingGrid.innerHTML = '';
    }
  }

  createTitle();

  const landingContainer = document.createElement('div');
  landingContainer.classList.add('landing-container');

  const grid = document.createElement('div');
  grid.classList.add('grid');

  const box1 = document.createElement('div');
  box1.classList.add('box');
  box1.style.gridColumn = 'span 2';
  box1.style.gridRow = 'span 1';
  const content1 = document.createElement('p');
  content1.innerHTML = "Descubra <strong>eventos cerca de ti</strong> para compartir conocimientos, inspirarse y crecer junto a su comunidad.";
  box1.appendChild(content1);

  const box2 = document.createElement('div');
  box2.classList.add('box');
  box2.style.gridColumn = 'span 2';
  box2.style.gridRow = 'span 1';
  const content2 = document.createElement('p');
  content2.innerHTML = "Explora los momentos más destacados de eventos pasados y planifique su participación en los próximos encuentros.";
  box2.appendChild(content2);

  const box3 = document.createElement('div');
  box3.classList.add('box');
  box3.style.gridColumn = 'span 1';
  box3.style.gridRow = 'span 3';
  const content3 = document.createElement('p');
  content3.innerHTML = "<strong>¿Tienes una pasión o idea que quieras compartir?</strong> Propon tu evento ideal y lo haremos posible.";
  const contactButton = document.createElement('button');
  contactButton.classList.add('contact-button');
  contactButton.innerText = 'Contactanos';
  box3.append(content3, contactButton);

  const box4 = document.createElement('div');
  box4.classList.add('box');
  box4.style.gridColumn = 'span 2';
  box4.style.gridRow = 'span 3';
  const img4 = document.createElement('img');
  img4.src = '/movie-night.webp'; 
  const content4 = document.createElement('p');
  content4.innerHTML = "Únase a una red vibrante de colaboradores, desde <strong>gente con ganas de compartir y pasar un buen rato</strong> hasta <strong>expertos locales y líderes de la comunidad.</strong>";
  box4.appendChild(img4);
  box4.appendChild(content4);

  const box5 = document.createElement('div');
  box5.classList.add('box');
  box5.style.gridColumn = 'span 1';
  box5.style.gridRow = 'span 3';
  const img5 = document.createElement('img');
  img5.src = '/backyard-party-lighting.webp'; 
  const content5 = document.createElement('p');
  content5.innerHTML = "<strong>Regístrate ahora</strong> y asegure su lugar en el próximo evento diseñado para inspirar e innovar.";
  
  const registerButton = document.createElement('button');
  registerButton.classList.add('register-landing-button');
  registerButton.innerText = 'Regístrate ahora';

  registerButton.onclick = () => {
    window.location.href = '/registro';
  };
  
  box5.appendChild(img5);
  box5.appendChild(content5);
  box5.appendChild(registerButton); 

  grid.appendChild(box1);
  grid.appendChild(box2);
  grid.appendChild(box3);
  grid.appendChild(box4);
  grid.appendChild(box5);

  landingContainer.appendChild(grid);
  pageContainer.appendChild(landingContainer);

  createTestimonials();
  createFaq(faqs);
};
