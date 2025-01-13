import { request } from "../api/request";
import { loginFetch } from "./loginFetch";
export const registerFetch = async (userName, email, password, phone, birthdate) => {
  try {
      const data = await request('/auth/register', 'POST', { userName, email, password, phone, birthdate });
      console.log(data);
      
    if(data){
      loginFetch(email, password);
      console.log(data); 
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};