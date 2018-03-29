const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const person = {
  name: 'Uzumaki',
  age: 22
};

let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

const team = players;

console.log(players, team);
team[3] = 'Lux';
console.log(players, team);

const team2 = players.slice();
const team3 = [].concat(players);
const team4 = [...players];
const team5 = Array.from(players);

const captain = person;
const captain2 = Object.assign({}, person, {number: 99});
const captain3 = {...person};

const uzu = {
  name: 'Uzu',
  age: 22,
  social: {
    twitter: 'dhanushuUzumaki',
    github: 'dhanushuUzumaki'
  }
};

console.log(uzu);

const dev = Object.assign({}, uzu);
dev.name = 'dhanushu';
console.log(uzu, dev);
const dev2 = JSON.parse(JSON.stringify(uzu));