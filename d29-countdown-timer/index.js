let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const timer = seconds => {
  const now = Date.now();
  const then = (now + seconds * 1000);
  displayTimeLeft(seconds)
  displayEndTime(then);
  clearInterval(countDown);
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
};


const displayTimeLeft = seconds => {
  const minutes = `${Math.floor(seconds / 60)}`;
  const remainderSeconds = `${seconds % 60}`;
  const display = `${minutes.padStart(2, '0')}:${remainderSeconds.padStart(2, '0')}`;
  timerDisplay.textContent = display;
  document.title = display;
};

const displayEndTime = timeStamp => {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = `${end.getMinutes()}`;
  const adjustedHours = hours > 12 ? `${hours - 12}` : `${hours}`;
  endTime.textContent = `Be Back At ${adjustedHours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const startTimer = function () {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})