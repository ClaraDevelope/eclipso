import { registerFetch } from '../../utils/registerFetch';
import './register.css';


// ? HABRÍA QUE MARCAR CON ESTILOS LOS INPUTS OBLIGATORIOS Y LOS QUE NO
export const createRegisterPage = () => {
  const pageContainer = document.querySelector('.page-container');
  pageContainer.innerHTML = '';

  const loginText = document.createElement('p');
  loginText.classList.add('login-text');
  loginText.innerHTML = '¿Ya tienes cuenta? <a href="/acceder" class="register-link">Entra aquí</a>';

  const registerContainer = document.createElement('div');
  registerContainer.classList.add('register-container');
  pageContainer.append(registerContainer, loginText);

  const registerTitle = document.createElement('h2');
  registerTitle.classList.add('register-title');
  registerTitle.innerText = 'Nueva cuenta';
  registerContainer.append(registerTitle);

  const slider = document.createElement('div');
  slider.classList.add('form-slider');
  registerContainer.append(slider);

  const steps = [
    {
      inputs: [
        { type: 'text', placeholder: 'Nombre completo', className: 'name-input', name: 'name' },
      ],
    },
    {
      inputs: [
        { type: 'email', placeholder: 'Correo electrónico', className: 'email-input', name: 'email' },
        { type: 'password', placeholder: 'Contraseña', className: 'password-input', name: 'password' },
        { type: 'password', placeholder: 'Confirmar contraseña', className: 'confirm-password-input', name: 'confirmPassword' },
      ],
    },
    {
      inputs: [
        { type: 'tel', placeholder: 'Teléfono (opcional)', className: 'phone-input', name: 'phone' },
        { type: 'date', placeholder: 'Fecha de nacimiento', className: 'birthdate-input', name: 'birthdate' },
      ],
    },
  ];

  let currentStep = 0;
  let formData = {}; // Objeto para guardar los datos de cada paso

  const renderStep = () => {
    slider.innerHTML = '';

    const formStep = document.createElement('form');
    formStep.classList.add('form-step');
    slider.append(formStep);

    steps[currentStep].inputs.forEach(input => {
      const inputElement = document.createElement('input');
      inputElement.type = input.type;
      inputElement.placeholder = input.placeholder;
      inputElement.classList.add(input.className);
      inputElement.setAttribute('name', input.name);
      
      // Si hay datos previos en formData, se los asignamos al input
      if (formData[input.name]) {
        inputElement.value = formData[input.name];
      }

      inputElement.addEventListener('input', (e) => {
        formData[input.name] = e.target.value; // Guardamos los valores en formData
      });

      formStep.append(inputElement);
    });

    const controls = document.createElement('div');
    controls.classList.add('form-controls');

    if (currentStep > 0) {
      const prevButton = document.createElement('button');
      prevButton.innerText = 'Anterior';
      prevButton.classList.add('prev-button');
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentStep--;
        renderStep();
      });
      controls.append(prevButton);
    }

    if (currentStep < steps.length - 1) {
      const nextButton = document.createElement('button');
      nextButton.innerText = 'Siguiente';
      nextButton.classList.add('next-button');
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentStep++;
        renderStep();
      });
      controls.append(nextButton);
    } else {
      const submitButton = document.createElement('button');
      submitButton.innerText = 'Registrar';
      submitButton.classList.add('submit-button');
      submitButton.type = 'submit'; // Asegurarnos de que es un botón de tipo submit
      formStep.append(submitButton);

      formStep.addEventListener('submit', (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, phone, birthdate } = formData;
        if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden');
        } else {
          registerFetch(name, email, password, phone, birthdate);
        }
      });

      controls.append(submitButton);
    }

    formStep.append(controls);
  };

  renderStep();
};
