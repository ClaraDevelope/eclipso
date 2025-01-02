export const isAuth = () => {
  const token = localStorage.getItem('authToken'); 
  console.log('Token disponible:', token);
  return token ? true : false;
};