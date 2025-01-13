import './Faq.css';

export const createFaq = (faqs) => {
  const pageContainer = document.querySelector('.page-container');
  const faqContainer = document.createElement('section');
  faqContainer.classList.add('faq-section');

  const faqTitle = document.createElement('h2');
  faqTitle.textContent = 'Preguntas Frecuentes';
  faqTitle.classList.add('faq-title');

  faqContainer.appendChild(faqTitle);

  const faqGrid = document.createElement('div');
  faqGrid.classList.add('faq-grid');

  faqs.forEach((faq) => {
    const faqCard = document.createElement('div');
    faqCard.classList.add('faq-card');

    const question = document.createElement('h3');
    question.textContent = faq.question;
    question.classList.add('faq-question');

    const answer = document.createElement('p');
    answer.textContent = faq.answer;
    answer.classList.add('faq-answer');
    answer.style.display = 'none';

    question.addEventListener('click', () => {
      const isVisible = answer.style.display === 'block';
      answer.style.display = isVisible ? 'none' : 'block';
      faqCard.classList.toggle('active', !isVisible);
    });
    
    

    faqCard.appendChild(question);
    faqCard.appendChild(answer);
    faqGrid.appendChild(faqCard);
  });

  faqContainer.appendChild(faqGrid);
  pageContainer.appendChild(faqContainer);
};
