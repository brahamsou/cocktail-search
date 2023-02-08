/*
Voici les différentes variables me permettant de contrôler le jeux de pong
*/
let rightBarControl = { up: "ArrowUp", down: "ArrowDown" };
let leftBarControl = { up: "z", down: "s" };
let rightBarUp = false;
let rightBarDown = false;
let leftBarUp = false;
let leftBarDown = false;
let rightBarSpeed = 2;
let leftBarSpeed = 2;
let ballUp = true;
let ballRight = false;
let ballSpeed = 4;

/*
Séction contenant les événements permettant de gérer les contrôles
des 2 barres
*/

document.addEventListener("keydown", (event) => {
  if (event.key === rightBarControl.up) {
    rightBarUp = true;
  }

  if (event.key === rightBarControl.down) {
    rightBarDown = true;
  }

  if (event.key === leftBarControl.up) {
    leftBarUp = true;
  }

  if (event.key === leftBarControl.down) {
    leftBarDown = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === rightBarControl.up) {
    rightBarUp = false;
  }

  if (event.key === rightBarControl.down) {
    rightBarDown = false;
  }

  if (event.key === leftBarControl.up) {
    leftBarUp = false;
  }

  if (event.key === leftBarControl.down) {
    leftBarDown = false;
  }
});

/*
Boucle de jeux. C'est une fonction qui se lance à l'infinie et
qui utilise notre carte graphique (GPU)
*/

function gameLoop() {
  // On appel la fonction permettant de bouger la barre de droite
  moveBar(
    document.querySelector(".bar.right"),
    rightBarUp,
    rightBarDown,
    rightBarSpeed
  );

  // On appel la fonction permettant de bouger la barre de gauche
  moveBar(
    document.querySelector(".bar.left"),
    leftBarUp,
    leftBarDown,
    leftBarSpeed
  );

  // on bouge la balle
  moveBall();

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

/**
 * Fonction permettant de bouger la barre
 */
function moveBar(bar, up = false, down = false, speed = 2) {
  // La position horizontal (top) de la barre de droite
  const y = bar.offsetTop;
  // La hauteur de mon écran
  const screenHeight = document.documentElement.clientHeight;
  // La hauteur de ma barre
  const barHeight = bar.clientHeight;
  // Ma position mininum
  const min = 0;
  // Ma position maximum
  const max = screenHeight - barHeight;

  // Si la barre doit allez vers le haut
  if (up) {
    // Changer la position de la barre vertica
    bar.style.top = Math.max(y - speed, min) + "px";
  }

  // Si la barre doit allez vers le bas
  if (down) {
    // Changer le position de la barre vertical
    bar.style.top = Math.min(y + speed, max) + "px";
  }
}

/*
Fonction permettant de bouger le balle
*/
function moveBall() {
  // On récupére la balle
  const ball = document.querySelector(".ball");
  // On récupére la positition vertical de la balle
  const y = ball.offsetTop;
  // On récupére la position horizontal de la balle
  const x = ball.offsetLeft;
  // On récupére la hauteur de l'écran
  const screenHeight = document.documentElement.clientHeight;
  // On récupére la largeur de l'écran
  const screenWidth = document.documentElement.clientWidth;
  // La largeur de la balle
  const ballWidth = ball.clientWidth;
  // La hauteur de la balle
  const ballHeight = ball.clientHeight;
  // Position vertical minimum
  const minY = 0;
  // Position vertical maximum
  const maxY = screenHeight - ballHeight;
  // Position horizontal minimum
  const minX = 0;
  // Position horizontal maximum
  const maxX = screenWidth - ballWidth;

  if (isColliding(ball, document.querySelector(".bar.left"))) {
    ballRight = true;
  }

  if (isColliding(ball, document.querySelector(".bar.right"))) {
    ballRight = false;
  }

  // Si ma balle va vers le haut
  if (ballUp) {
    // On diminue sa position y
    ball.style.top = Math.max(minY, y - ballSpeed) + "px";

    // Si ma balle touche le mur en haut
    if (ball.offsetTop === minY) {
      ballUp = false;
    }
  } else {
    // Si ma balle va vers le bas
    // On augment sa position y
    ball.style.top = Math.min(maxY, y + ballSpeed) + "px";

    // Si ma balle touche le mur en base
    if (ball.offsetTop === maxY) {
      ballUp = true;
    }
  }

  // Si ma balle va vers la droite
  if (ballRight) {
    // On augmente sa position x (left)
    ball.style.left = Math.min(maxX, x + ballSpeed) + "px";

    // Si ma balle toucbe le mur à droite :
    if (ball.offsetLeft === maxX) {
      ballRight = false;
    }
  } else {
    // Si ma balle va vers la gauche
    // On diminue sa position x (left)
    ball.style.left = Math.max(minX, x - ballSpeed) + "px";

    // Si ma balle touche le mur de gauche
    if (ball.offsetLeft === minX) {
      ballRight = true;
    }
  }
}

/**
 * Fonction permettant de tester si une bar et une balle sont en collision.
 *
 * Cette fonction renvoie faux si ce n'est pas le cas et vrai si c'est le cas
 */
function isColliding(ball, bar) {
  // La position x et y de la balle
  const ballX = ball.offsetLeft;
  const ballY = ball.offsetTop;
  const maxBallX = ball.offsetLeft + ball.clientWidth;
  const maxBallY = ball.offsetTop + ball.clientHeight;

  // La position x et y de la bar
  const barX = bar.offsetLeft;
  const barY = bar.offsetTop;
  const maxBarX = bar.offsetLeft + bar.clientWidth;
  const maxBarY = bar.offsetTop + bar.clientHeight;

  // Si la position x de la balle est entre la position x de la barre et la position x maximum
  // de la barre
  if (ballX > maxBarX || maxBallX < barX) {
    return false;
  }

  if (ballY > maxBarY || maxBallY < barY) {
    return false;
  }

  return true;
}
