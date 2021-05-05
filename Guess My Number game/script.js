'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'No Number';
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? 'Guess is too HIGH' : 'Guess is too LOW';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game LOST!!!';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('.message').textContent = 'CORRECT!!!!!! ';

    document.querySelector('.score').textContent = score;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      document.querySelector('.highscore').textContent = score;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('.number').style.width = '15rem';

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.score').textContent = score;

  document.querySelector('.message').textContent = 'Start Guessing....';

  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';
});
