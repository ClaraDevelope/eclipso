export const isAuth = () => {
  const token = localStorage.getItem('authToken'); 
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId');

  console.log('Token disponible:', token);
  console.log('userName disponible:', userName);
  console.log('email disponible:', email);
  console.log('userId disponible:', userId);
  
  if (token && userName && email && userId) {
    return true; 
  }
  return false; 
};
