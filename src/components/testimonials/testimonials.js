import './testimonials.css';

export const createTestimonials = () => {
  const pageContainer = document.querySelector('.page-container');
  const testimonialSection = document.createElement('div');
  testimonialSection.classList.add('testimonial-section');

  const subtitle = document.createElement('p');
  subtitle.innerText = 'Lo que dicen sobre nosotros';
  subtitle.classList.add('testimonial-subtitle');

  const testimonialContainer = document.createElement('div');
  testimonialContainer.classList.add('testimonial-container');

  const testimonials = [
    {
      avatar: '/avatar1.webp', 
      text: 'La organización de los eventos es excepcional, siempre me siento inspirado y conectado con la comunidad.',
      name: 'Carlos Martínez',
    },
    {
      avatar: '/avatar2test.webp', 
      text: 'Un espacio donde compartir conocimientos y aprender de otras expertas locales. ¡Es increíble!',
      name: 'Laura Gómez',
    },
    {
      avatar: '/avatar3.webp', 
      text: 'Participar en los eventos culturales está siendo una experiencia transformadora. Me encanta formar parte de esta red.',
      name: 'Ana López',
    },
  ];

  testimonials.forEach(({ avatar, text, name }) => {
    const testimonialBox = document.createElement('div');
    testimonialBox.classList.add('testimonial-box');

    const avatarImg = document.createElement('img');
    avatarImg.src = avatar;
    avatarImg.alt = `${name}'s avatar`;
    avatarImg.classList.add('testimonial-avatar');

    const testimonialText = document.createElement('p');
    testimonialText.innerText = text;
    testimonialText.classList.add('testimonial-text');

    const testimonialName = document.createElement('span');
    testimonialName.innerText = name;
    testimonialName.classList.add('testimonial-name');

    // Añadir elementos al testimonio
    testimonialBox.appendChild(avatarImg);
    testimonialBox.appendChild(testimonialText);
    testimonialBox.appendChild(testimonialName);

    // Añadir testimonio al contenedor
    testimonialContainer.appendChild(testimonialBox);
  });

  // Añadir todo a la sección principal
  testimonialSection.appendChild(subtitle);
  testimonialSection.appendChild(testimonialContainer);

  // Añadir la sección a la landing
  pageContainer.appendChild(testimonialSection);
};
