/**
 * Ouvre le panneaux lateral
 */
export function openOverlayPanel(drink) {
    // Je séléctionne l'overlay
    const overlay = document.querySelector('.overlay')
    // Je l'active
    overlay.classList.remove('disable')
    overlay.classList.add('active')
  
    // On change l'image du coktail
    const img = document.querySelector('.overlay .img-container img')
    img.setAttribute('alt', drink.strDrink)
    img.setAttribute('src', drink.strDrinkThumb)
  
    // On change le titre
    const title = document.querySelector('.overlay h2')
    title.innerText = drink.strDrink
  
    // On vide les ingrédients
    const ul = document.querySelector('.overlay ul')
    ul.innerHTML = ''
  
    // On créer un tableaux de 15 éléments, car il existe 15 ingrédient
    const ingredientList = Array.from({ length: 15 }, (v, i) => ({
      label: drink[`strIngredient${i + 1}`],
      measure: drink[`strMeasure${i + 1}`],
    }))
  
    // on boucle sur les ingrédients
    for (const ingredient of ingredientList) {
      if (!ingredient.label) {
        break
      }
  
      // On créé une balise li
      const li = document.createElement('li')
      // On place le nom de l'ingrédient
      li.innerText = ingredient.label
      // On ajoute le li dans le ul
      ul.append(li)
  
      if (!ingredient.measure) {
        continue
      }
  
      li.innerText += ` (${ingredient.measure})`
    }
  
    // On affiche les intructions
    const instruction = document.querySelector('.overlay .instructions')
    instruction.innerText = drink.strInstructions
  }
  
  /**
   * On referme l'overlay
   */
  export function closeOverlay() {
    // Je séléctionne l'overlay
    const overlay = document.querySelector('.overlay')
  
    // J'enléve la class `active` et je rajoute la class `disable`
    overlay.classList.remove('active')
    overlay.classList.add('disable')
  }