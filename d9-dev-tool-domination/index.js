const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

console.log('hello');
console.log('Hello I am a %s string', 'simple');
console.log('%c I am some great text', 'font-size: 50px; background: red;');

console.warn('Warning');
console.error('Error');
console.info('This is an info');
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'That is wrong');
console.clear();
console.dir(p);

dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

console.time('fetching data');
fetch('https://api.github.com/users/dhanushuUzumaki')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
  });

console.table(dogs);