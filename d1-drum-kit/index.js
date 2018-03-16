const keys = document.querySelectorAll('.key');
const removeClassName = function (e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
};
const playSound = function (e) {
  const pressedKey = e.keyCode;
  const key = document.querySelector(`.key[data-key="${pressedKey}"]`);
  const audio = document.querySelector(`audio[data-key="${pressedKey}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

keys.forEach(key => key.addEventListener('transitionend', removeClassName));
window.addEventListener('keydown', playSound);
