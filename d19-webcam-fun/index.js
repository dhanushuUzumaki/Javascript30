const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const redEffect = (pixels) => {
  for(let i = 0, len = pixels.data.length; i < len; i += 4) {
    pixels.data[i] = pixels.data[i] + 100; // R
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // G
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // B
  }
  return pixels;
}

const rgbSplit = (pixels) => {
  for(let i = 0, len = pixels.data.length; i < len; i += 4) {
    pixels.data[i - 150] = pixels.data[i]; // R
    pixels.data[i + 500] = pixels.data[i + 1]; // G
    pixels.data[i - 550] = pixels.data[i + 2]; // B
  }
  return pixels;
}

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach(input => levels[input.name] = input.value);
  for(let i = 0, len = pixels.data.length; i < len; i += 4) {
    red = pixels.data[i];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    // ctx.globalAlpha = 0.1;
    // pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="pic"/>`;
  strip.insertBefore(link, strip.firstChild);
}

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(localMediaStream => {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
    paintToCanvas();
  }).catch(err => {
    console.log('error');
  });
};

getVideo();
video.addEventListener('canplay', paintToCanvas);