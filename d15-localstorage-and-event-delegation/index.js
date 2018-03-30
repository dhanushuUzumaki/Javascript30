const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const controlButtons = document.querySelectorAll('.btn');

const updateLocalStorage = () => {
  localStorage.setItem('items', JSON.stringify(items));
};

const controlBtnActions = {
  checkAll: () => {
    items.forEach(item => item.done = true);
  },
  uncheckAll: () => {
    items.forEach(item => item.done = false);
  },
  deleteAll: () => {
    items = [];
  }
};

const handleControlBtnClick = function (e) {
  const action = e.target.dataset.action;
  controlBtnActions[action]();
  populateList(items, itemsList);
  updateLocalStorage();
};

const toggleDone = function (e) {
  if(!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  updateLocalStorage();
};

const populateList = function (plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
};

const addItem = function (e) {
  e.preventDefault();
  const text = (this.querySelector('[name="item"]')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  this.reset();
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
controlButtons.forEach(btn => btn.addEventListener('click', handleControlBtnClick));
populateList(items, itemsList);

