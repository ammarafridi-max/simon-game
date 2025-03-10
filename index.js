var colorSequence = [];
var clickEnabled = true;
var level = -1;
var currentElement = 0;
var gameOver = false;

const topTenScores = localStorage.getItem('topTenScores') ? JSON.parse(localStorage.getItem('topTenScores')) : [];

console.log(topTenScores)

const body = document.getElementsByTagName('body')[0];
const title = document.getElementsByTagName('h1')[0];
const btnGrid = document.getElementById('grid');
const scoresContainer = document.getElementById('scores-container');
const scoresList = document.getElementById('scores-list')

function gameStart() {
  btnGrid.style.display = 'grid';
  scoresContainer.style.display = 'none'
  currentElement = 0;
  level++;

  title.innerText = `Your score: ${level}`;
  const random = Math.floor(Math.random() * 4);
  clickEnabled = false;

  switch (random) {
    case 0:
      colorSequence.push('blue');
      animateButtons('blue');
      addSound('blue');
      break;
    case 1:
      colorSequence.push('green');
      animateButtons('green');
      addSound('green');
      break;
    case 2:
      colorSequence.push('red');
      animateButtons('red');
      addSound('red');
      break;
    case 3:
      colorSequence.push('yellow');
      animateButtons('yellow');
      addSound('yellow');
      break;
  }
}

function addSound(btn) {
  var audio = new Audio('sounds/' + btn + '.mp3');
  audio.play();
}

body.addEventListener('keydown', function () {
  if (clickEnabled === true) {
    gameStart();
  }

  if (gameOver === true) {
    colorSequence = [];
    clickEnabled = true;
    level = 0;
    currentElement = 0;
    gameOver = false;
    title.innerText = 'Press A Key to Start';
    console.log(colorSequence);
  }
})

$('.btn').click(function (event) {
  if (this.id !== colorSequence[currentElement]) {
    addSound('wrong');
    clickEnabled = false;
    gameOver = true;

    body.classList.add('game-over');
    title.innerText = `Game over! Your score is ${level}. Press any key to restart.`;

    topTenScores.push(level);
    topTenScores.sort((a, b) => b - a);
    if (topTenScores.length > 10) {
      topTenScores.pop();
    }
    localStorage.setItem('topTenScores', JSON.stringify(topTenScores));

    btnGrid.style.display = 'none';
    scoresContainer.style.display = 'block';

    topTenScores.map((score) => {
      return scoresList.insertAdjacentHTML('beforeend', `<li>${score}</li>`)
    })

    body.classList.remove('game-over');
  } else if (this.id === colorSequence[currentElement]) {
    addSound(this.id);
    animateButtons(this.id);
    currentElement++;
    if (colorSequence.length === currentElement) {
      setTimeout(function () {
        gameStart();
      }, 1000);
    }
  }
});

function animateButtons(color) {
  $('.' + color).addClass('pressed');
  setTimeout(function () {
    $('.' + color).removeClass('pressed');
  }, 100);
}
