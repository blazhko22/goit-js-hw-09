const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.currentTarget;
  const times = parseInt(form.elements.amount.value);
  let delay = parseInt(form.elements.delay.value);
  let step = parseInt(form.elements.step.value);

  for (let i = 1; i <= times; i += 1) {
    createPromise(i, delay)
      .then(value => {
        console.log(value);
      })
      .catch(error => {
        console.log(error);
      });
    delay += step;
  }

  delay = parseInt(form.elements.delay.value);
});

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
