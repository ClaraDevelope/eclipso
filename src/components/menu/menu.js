import { isAuth } from '../../utils/isAuth'
import './menu.css'

export const createMenu = (authLinks, noAuthLinks) =>{
  const app = document.getElementById('app')
  const nav = document.createElement('nav')
  nav.classList.add('menu')
  isAuth()? authLinks.map((link) =>{
    const a = document.createElement('a')
    a.textContent = link
    a.href = `#${link.toLowerCase().replace(' ', '-')}`
    nav.appendChild(a)
  }) : noAuthLinks.map((link) =>{
    const a = document.createElement('a')
    a.textContent = link
    a.href = `#${link.toLowerCase().replace(' ', '-')}`
    nav.appendChild(a)
  })
  app.appendChild(nav)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}