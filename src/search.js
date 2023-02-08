import { openOverlayPanel } from './detail'

/**
 * Recherche des coktails
 */
export async function searchForCocktails() {
  // On récupére la valeur de recherche
  const search = document.querySelector('#search').value

  // Si je n'ai rien rentré
  if (!search) {
    // On arréte la fonction
    return
  }

  // On fait une requête HTTP aux serveur contenant les cocktails
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,
  )

  // Je récupére l'objet javascript que le serveur m'a renvoyé en utilisant json
  const data = await response.json()

  // Je récupére la liste de cocktails
  const drinks = data.drinks

  // Je récupére le container pour mes cocktails
  const container = document.querySelector('.cocktail-container')

  // Je vide le container
  container.innerHTML = ''

  // Je dois boucler sur les cocktails
  for (const drink of drinks) {
    // Je créer la div d'un cocktail
    const div = createCocktail(drink.strDrink, drink.strDrinkThumb)
    // J'ajoute la div dans le container
    container.append(div)

    div.addEventListener('click', () => openOverlayPanel(drink))
  }
}

/**
 * Fonction permettant de créer la div.cocktail
 */
export function createCocktail(nom, image) {
  // On créer la div principal
  const root = document.createElement('div')
  root.classList.add('cocktail')

  // On créer la div contenant l'image
  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')

  // On créer la div pour le detail
  const detail = document.createElement('div')
  detail.classList.add('detail')

  // On créé l'image
  const img = document.createElement('img')
  img.setAttribute('alt', nom)
  img.setAttribute('src', image)

  // On crée le paragraph contenant le nom du cocktail
  const p = document.createElement('p')
  p.innerText = nom

  // On assemble les éléments
  root.append(imgContainer)
  root.append(detail)
  imgContainer.append(img)
  detail.append(p)

  // On retourne la div
  return root
}