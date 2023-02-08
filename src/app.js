import { closeOverlay } from './detail'
import { searchForCocktails } from './search'
import { displaySearchBar } from './splash'

// Attache un évenement lors du clique sur le splash !
document
  .querySelector('.splash-container')
  .addEventListener('click', displaySearchBar)

// On attache un évenement lors du clique sur le bouton rechercher
document
  .querySelector('.search-bar button')
  .addEventListener('click', searchForCocktails)

// On ajoute un event sur le keypress de l'input
document.querySelector('#search').addEventListener('keyup', searchForCocktails)

// On ajoute un événement pour fermer l'overlay
document
  .querySelector('.overlay .top-bar')
  .addEventListener('click', closeOverlay)