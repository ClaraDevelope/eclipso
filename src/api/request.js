const BASE_URL = import.meta.env.VITE_API_URL;

export const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  if (!BASE_URL) {
    throw new Error('API_URL no está definida en el archivo .env');
  }

  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers, 
  };
  console.log(headers);
  
  if (body) {
    if (body instanceof FormData) {
      delete defaultHeaders['Content-Type'];
    } else {
      body = JSON.stringify(body); 
    }
  }

  try {

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};

