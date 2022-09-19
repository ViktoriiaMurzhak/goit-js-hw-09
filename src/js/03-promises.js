import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
console.log('formEl', formEl);

formEl.addEventListener('submit', promisesFabrica);

function promisesFabrica(event) {
  event.preventDefault();

  let delay = Number(this.delay.value);
  let step = Number(this.step.value);
  let amount = Number(this.amount.value);
  let count = 0;
  let difference = delay - step;

  const makeCount = setInterval(() => {
    count += 1;
    difference += step;

    createPromise(count, difference).then(showSucces).catch(showError);

    if (count === amount) {
      clearInterval(makeCount);
    }
  }, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function showSucces(value) {
  Notify.success(value);
}
function showError(error) {
  Notify.failure(error);
}
