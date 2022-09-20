import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const el = {
  dateInput: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

el.start.disabled = ' ';
let intervalId = null;

let choiceData = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
      return;
    } else {
      el.start.removeAttribute('disabled');
    }
  },
});

el.start.addEventListener('click', onStart);

function onStart() {
  el.start.disabled = ' ';
  intervalId = setInterval(() => {
    makeSpan();

    const msResult = choiceData.selectedDates[0] - Date.now();

    if (msResult <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function makeSpan() {
  const { daysSpan, hoursSpan, minutesSpan, secondsSpan } = el;

  const msResult = choiceData.selectedDates[0] - Date.now();

  const { days, hours, minutes, seconds } = convertMs(msResult);
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
