import { router } from '../../routes/routes';
import { loginFetch } from '../../utils/loginFetch';
import './login.css';

export const createLoginPage = () => {
  const pageContainer = document.querySelector('.page-container');
  pageContainer.innerHTML = '';

  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container');
  pageContainer.append(loginContainer);

  const loginTitle = document.createElement('h2');
  loginTitle.classList.add('login-title');
  loginTitle.innerText = 'Inicia sesión';

  const loginForm = document.createElement('form');
  loginForm.classList.add('login-form');

  const emailInput = document.createElement('input');
  emailInput.classList.add('email-input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electrónico');

  const passwordInput = document.createElement('input');
  passwordInput.classList.add('password-input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Contraseña');

  const loginButton = document.createElement('button');
  loginButton.classList.add('login-button');
  loginButton.innerText = 'Iniciar sesión';

  const registerText = document.createElement('p');
  registerText.classList.add('register-text');
  registerText.innerHTML = '¿No tienes cuenta? <a href="#" class="register-link">Regístrate aquí</a>';

  // Manejo de la navegación para el enlace de registro
  const registerLink = registerText.querySelector('.register-link');
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/registro');  // Navegar a la página de registro
  });

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    loginFetch(email, password)
      .then((response) => {
        if (response.success) {
          router.navigate('/home'); // Navegar a la página principal si el login es exitoso
        } else {
          alert('Credenciales incorrectas');
        }
      })
      .catch((error) => {
        alert('Hubo un problema con el inicio de sesión');
      });
  });

  loginForm.append(emailInput, passwordInput, loginButton, registerText);
  loginContainer.append(loginTitle, loginForm);
};

