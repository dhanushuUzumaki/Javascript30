const secretCode = 'uzu';
const pressed = [];
window.addEventListener('keyup', (e) => {
  pressed.push(e.key);
  pressed.splice(-secretCode.length, pressed.length - secretCode.length);
  if (pressed.join('').includes(secretCode)) {
    cornify_add();
  }
})