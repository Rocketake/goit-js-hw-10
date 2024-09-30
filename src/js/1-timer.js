// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let intervalId;

const startButton = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (Date.parse(userSelectedDate) < Date.now()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        timeout: '3000',
      });
      startButton.setAttribute('disabled', '');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function setTimer() {
  input.setAttribute('disabled', '');
  startButton.setAttribute('disabled', '');
  intervalId = setInterval(() => {
    const timerDate = Date.parse(userSelectedDate) - Date.now();
    const convertedTimerDate = convertMs(timerDate);
    if (timerDate < 1000) {
      clearInterval(intervalId);
      input.removeAttribute('disabled', '');
    }
    days.textContent = addLeadingZero(convertedTimerDate.days);
    hours.textContent = addLeadingZero(convertedTimerDate.hours);
    minutes.textContent = addLeadingZero(convertedTimerDate.minutes);
    seconds.textContent = addLeadingZero(convertedTimerDate.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', setTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
