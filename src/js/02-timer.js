import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
 
const today = Date.now()
refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectDate = selectedDates[0].getTime()
        if (selectDate <= today) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.btnStart.disabled = false;
            refs.btnStart.addEventListener('click', time)
            
        }
        function time() {
            const timeInterval = setInterval(() => {
                    const today = Date.now()
                const ms = selectDate - today;
                if (ms <= 0) {
                    clearInterval(timeInterval)
                } else {
                    const time = convertMs(ms);
                clockUpdate(time)
                }
                    
        }, 1000);
    }
}
};




flatpickr (refs.input, options);

function convertMs(ms) {
    const days = addLeadingZero(Math.floor( ms / 1000 /60 / 60 / 24));
    const hours = addLeadingZero(Math.floor(ms / 1000 /60 / 60 % 24));
    const minutes = addLeadingZero(Math.floor(ms / 1000 / 60 % 60));
    const seconds = addLeadingZero(Math.floor(ms / 1000 % 60));
    return { days, hours, minutes, seconds };
}

function clockUpdate({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}