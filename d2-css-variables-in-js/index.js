const controls = document.querySelectorAll('.control input');

const handleUpdate = function (e) {
  const value = e.target.value;
  const size = this.dataset.size || '';
  document.documentElement.style.setProperty(`--${this.name}`, value + size);
}

controls.forEach(input => input.addEventListener('change', handleUpdate));
controls.forEach(input => input.addEventListener('mousemove', handleUpdate));