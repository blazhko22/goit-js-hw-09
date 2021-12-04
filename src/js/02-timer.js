import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const currentDate = Date.now();
let dateElClock = null;
let intervalId = null;
refs.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateElClock = selectedDates[0];
    if (dateElClock > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};
const flatpickrEl = new flatpickr(refs.startInput, options);
refs.startBtn.addEventListener('click', updateClockRun);
function updateClockRun() {
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = dateElClock - currentDate;
    refs.days.textContent = convertMs(deltaTime).days;
    refs.hours.textContent = convertMs(deltaTime).hours;
    refs.minutes.textContent = convertMs(deltaTime).minutes;
    refs.seconds.textContent = convertMs(deltaTime).seconds;
    refs.startBtn.disabled = true;
    flatpickrEl.input.setAttribute('disabled', 'disabled');
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      refs.startInput.disabled = false;
    }
  }, 1000);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
