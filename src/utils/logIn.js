export const login = (token) => {
  localStorage.setItem('authToken', token);
};