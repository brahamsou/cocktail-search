/**
 * Affiche la barre de recherche
 */
export function displaySearchBar() {
    // Ajouter la classe mini à mon splash !
    const splash = document.querySelector('.splash-container')
    splash.classList.add('mini')
    // Ajouter la class active au search bar
    const searchBar = document.querySelector('.search-bar')
    searchBar.classList.add('active')
  
    // On supprime le click sur le splash !
    splash.removeEventListener('click', displaySearchBar)
  }