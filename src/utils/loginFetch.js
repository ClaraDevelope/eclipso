import { request } from "../api/request";
import { createSkeleton, removeSkeleton } from "../components/loading/loading";

export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};
export const loginFetch = async (email, password) => {
  try {
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

    createSkeleton(); // Mostrar el loading skeleton antes de la petición

    // Simular retraso con setTimeout (para ver el loading)
    setTimeout(async () => {
      const data = await request('/auth/login', 'POST', { email, password });
      if (data.token) {
        saveToken(data.token);
        console.log('Token de inicio de sesión:', data.token);
        window.location.hash = '#landing';
        window.location.reload();
      }
    }, 2000); // Retraso de 2 segundos (2000ms)

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  } finally {
    // Esperamos 2 segundos antes de eliminar el skeleton
    setTimeout(() => {
      removeSkeleton(); // Eliminar el skeleton después de hacer la petición
    }, 2000); // 2000 ms = 2 segundos
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