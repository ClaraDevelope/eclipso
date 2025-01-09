import { request } from "../api/request";
import { createSkeleton, removeSkeleton } from "../components/loading/loading";
import { router } from "../routes/routes";

export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const saveUserData = (userName, email, _id) => {
  localStorage.setItem('userName', userName);
  localStorage.setItem('email', email);
  localStorage.setItem('userId', _id)
};

export const loginFetch = async (email, password) => {
  try {
    console.log('Iniciando login con:', { email, password });

    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
      loginContainer.remove(); 
    }

    const registerContainer = document.querySelector('.register-container');
    const loginText = document.querySelector('.login-text');
    if (registerContainer && loginText) {
      registerContainer.remove();
      loginText.remove();
    }

    createSkeleton();

    const data = await request('/auth/login', 'POST', { email, password });

    console.log('Respuesta del backend:', data);

    if (data.token) {
      saveToken(data.token);

      if (data.usuario) {
        console.log('Datos de usuario recibidos:', data.usuario);
        saveUserData(data.usuario.userName, data.usuario.email, data.usuario._id);
      }
   
      return data;
    } else {
      console.warn('No se recibió token en la respuesta.');

      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  } finally {
    removeSkeleton(); 
  }
};




// export const loginFetch = async (email, password) => {
//   try {
//     createSkeleton()
//     const data = await request('/auth/login', 'POST', { email, password });
//     if (data.token) {
//       saveToken(data.token);
//       console.log('Token de inicio de sesión:', data.token); 
//       window.location.hash = '#landing';
//       window.location.reload();
//     }
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//   } finally{
//     removeSkeleton()
//   }
// };