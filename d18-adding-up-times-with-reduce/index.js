const timeNodes = [...document.querySelectorAll('[data-time]')];
// const seconds = timeNodes
//   .map(node => node.dataset.time)
//   .map(timeCode => {
//     const [mins, secs] = timeCode.split(':').map(parseFloat);
//     return (mins * 60) + secs;
//   })
//   .reduce((sum, sec) => sum + sec, 0);
const seconds = timeNodes.reduce((sum, node) => {
  const [mins, secs] = node.dataset.time.split(':').map(parseFloat);
  return sum + (mins * 60) + secs;
}, 0)
let secondsLeft = seconds;
let hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
let minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
console.log(`Total: ${hours}:${minutes}:${secondsLeft}`);