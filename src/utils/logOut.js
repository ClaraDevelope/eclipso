import { createLoadingSpinner, removeLoadingSpinner } from "../components/loading/loading";
import { router } from "../routes/routes";

export const logout = () => {
  console.log('Me estoy desconectando!!!!');
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName')
  localStorage.removeItem('email')
  localStorage.removeItem('userId')
  createLoadingSpinner()
  // router.navigate('/')
  window.location.reload();
  removeLoadingSpinner()
};
