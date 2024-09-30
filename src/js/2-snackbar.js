// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[name="delay"]');
const fieldset = document.querySelector('fieldset');
const form = document.querySelector('.form');

let delayValue = 0;
let state;

input.addEventListener('change', evt => {
  delayValue = evt.target.value;
});

fieldset.addEventListener('click', evt => {
  state = evt.target.value;
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  makePromise({ delayValue, state })
    .then(value => {
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        timeout: '3000',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        timeout: '3000',
      });
    });
  form.reset();
}

const makePromise = ({ delayValue, state }) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delayValue);
      } else {
        rejected(delayValue);
      }
    }, delayValue);
  });
};
