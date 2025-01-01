import './title.css'

export const createTitle = () =>{
  const app = document.getElementById('app')
  const titleContainer = document.createElement('div')
  titleContainer.classList.add('title-container')
  const title = document.createElement('h1')
  title.classList.add('title')
  title.innerText = 'Eclipso'
  // const subtitle = document.createElement('h2')
  // subtitle.classList.add('subtitle')
  // subtitle.innerText = 'Tu próximo encuentro comienza aquí'
  titleContainer.append(title)
  app.appendChild(titleContainer)
}