const BASE_URL = import.meta.env.VITE_API_URL;

export const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  if (!BASE_URL) {
    throw new Error('API_URL no está definida en el archivo .env');
  }

  const url = `${BASE_URL}${endpoint}`;

  // Establecer cabeceras predeterminadas
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,  // Permite sobrescribir las cabeceras si se pasan
  };

  // Si el método es POST, PUT, PATCH y se pasa un body, lo convertimos a JSON
  if (body) {
    if (body instanceof FormData) {
      // Si es FormData, no necesitamos 'Content-Type', ya que se maneja automáticamente
      delete defaultHeaders['Content-Type'];
    } else {
      body = JSON.stringify(body);  // Convertimos el body a JSON si no es FormData
    }
  }

  try {
    // Hacer la solicitud fetch
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body,
    });

    // Si la respuesta no es ok (status fuera del rango 200-299), lanzamos un error
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Intentamos obtener la respuesta en formato JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};

