import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('[type="submit"]'),

}
const object = {};

refs.form.addEventListener('input', getValue);
refs.btn.addEventListener('click', getPromise);

function getValue(e) {
  object[`${e.target.name}`] = e.target.value;

}


function getPromise(e) {
  e.preventDefault()
  for (let i = 1, delay=Number(object.delay), step = Number(object.step); i <= object.amount; step, i++) {
      delay += step
    const position = i;
    createPromise( position, delay );
  }
  
}


function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
            if (shouldResolve) {
          // Fulfillc
              resolve({ position, delay });
        } else {
          // Reject
              reject({ position, delay });
        }
    }, delay)
  })
    
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch (({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}

