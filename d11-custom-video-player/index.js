const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullscreen__button');

const togglePlay = function () {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

const updateButton = function () {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

const skip = function () {
  video.currentTime += parseFloat(this.dataset.skip);
}

const handleRangeUpdate = function () {
  video[this.name] = this.value;
}

const handleProgress = function () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = function (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

const isFullScreen = function() {
  return document.webkitIsFullScreen || //Webkit browsers
         document.mozFullScreen || // Firefox
         document.msFullscreenElement !== undefined; // IE
}

const toggleFullScreen = function (e) {
  if (isFullScreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozExitFullScreen) {
      document.mozExitFullScreen();
    }
  }
  else {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  }
}

let mouseDown = false;

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullScreenButton.addEventListener('click', toggleFullScreen);