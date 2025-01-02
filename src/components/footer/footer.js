import './footer.css'
export const createFooter = () => {
  const app = document.querySelector('#app');
  const footer = document.createElement("footer");

  const footerText = document.createElement("p");
  footerText.innerHTML = `© 2025 Creado por Clara Manzano Corona | Código abierto en <a href="https://github.com/ClaraDevelope" target="_blank"> GitHub</a> | Eclipso`;

  footer.appendChild(footerText);

  app.append(footer);
};

