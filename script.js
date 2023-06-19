const startBtn = $('#start')
const screens = $('.screen')
const timeList = $('#time-list')
const timeEl = $('#time')
const board = $('#board')

let time = 0;
let score = 0;

startBtn.on('click', function (event) {
  event.preventDefault()
  screens.first().addClass('up')
});

timeList.on('click', function (event) {
  if ($(event.target).hasClass('time-btn')) {
    time = parseInt($(event.target).attr('data-time'))
    $(screens[1]).addClass('up')
    startGame()
  }
})

board.on('click', function (event) {
  if ($(event.target).hasClass('circle')) {
    score++
    createRandomCircles()
    $(event.target).remove()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircles()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.html(`00:${value}`)
}

function finishGame() {
  timeEl.parent().addClass('hide')
  board.html(`
    <h1>Your score: 
      <span class="primary">${score}</span>
    </h1>
    <button class="time-btn" onclick="window.location.reload()">
      Restart
    </button>
  `)
}

function createRandomCircles() {
  const circle = $('<div></div>');
  let size;

  if ($(document.body).innerWidth() <= 516) {
    size = getRandomNumber(15, 30)
  } else if ($(document.body).innerWidth() <= 320) {
    size = getRandomNumber(20, 40)
  } else {
    size = getRandomNumber(20, 60)
  }

  const height = board.height()
  const width = board.width()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.css({
    'top': `${x}px`,
    'left': `${y}px`,
    'width': `${size}px`,
    'height': `${size}px`
  });

  circle.addClass('circle')
  board.append(circle)

  const color = getRandomColor()
  circle.css('background', color)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  const colors = ['#1abc9c', '#4efc53', '#3498db', '#9b59b6', '#ff3f34', '#f1c40f', '#f57e33', '#48dbfb']

  return colors[Math.floor(Math.random() * colors.length)];
}

/* 
  // to use the hack, simply call the winTheGame function
  winTheGame() 
  function winTheGame() {
    function kill() {
      const circle = document.querySelector('.circle')

      if (circle) {
        circle.click()
      }
    }

    setInterval(kill, 50)
} */