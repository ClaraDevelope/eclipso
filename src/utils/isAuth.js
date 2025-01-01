export const isAuth = () =>{
  const token = localStorage.getItem('authToken'); 
  return token ? true : false;
}