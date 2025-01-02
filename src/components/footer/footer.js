import './footer.css'
export const createFooter = () => {
  const app = document.querySelector('#app');
  const footer = document.createElement("footer");

  const footerText = document.createElement("p");
  footerText.textContent = "© 2025 Creado por Clara Manzano Corona | Código abierto en GitHub | Eclipso |";

  const footerLink = document.createElement("a");
  footerLink.href = "https://github.com/ClaraDevelope";
  footerLink.textContent = "GitHub";
  footerLink.target = "_blank";

  footer.appendChild(footerText);
  footer.appendChild(footerLink);

  app.append(footer);
};
