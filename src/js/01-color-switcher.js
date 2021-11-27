function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyColor = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');

const changeColor = 1000;
let intervalId = null;

startBtn.addEventListener('click', onStartBtn);
stoptBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  intervalId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, changeColor);
  startBtn.disabled = true;
}

function onStopBtn() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
