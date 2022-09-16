const el = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

el.stop.disabled = ' ';

let timeInterval = null;

el.start.addEventListener('click', onStart);
el.stop.addEventListener('click', onStop);

function onStart(event) {
  timeInterval = setInterval(() => {
    let color = getRandomHexColor();
    el.body.style.background = color;
  }, 1000);
  buttonsDisabledStart();
}

function onStop(event) {
  clearInterval(timeInterval);
  buttonsDisabledStop();
}

function buttonsDisabledStart() {
  if (onStart) {
    el.start.disabled = ' ';
    el.stop.removeAttribute('disabled');
  }
}

function buttonsDisabledStop() {
  if (onStop) {
    el.start.removeAttribute('disabled');
    el.stop.disabled = ' ';
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
