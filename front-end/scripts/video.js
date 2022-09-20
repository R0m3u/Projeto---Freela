// VIDEO PLAYER
const video = document.querySelectorAll('video');
const control = document.querySelectorAll('.control');
const progress = document.querySelectorAll('.progress-bar');
const purpleBar = document.querySelectorAll('.purple-bar');
const volumeBox = document.querySelectorAll('.volume-box');
const volume = document.querySelectorAll('.volume');
const mute = document.querySelectorAll('.mute');
const expand = document.querySelectorAll('.full_screen');

const play = (video, i) => {
  video[i].play().then(() => {
    console.log('deu certo');
  }).catch((error) => console.log(error));
};

control.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (video[i].paused) {
      el.src = '/assets/imgs/pause.png';
      play(video, i);
      video[i].addEventListener('mouseout', () => {
        el.style.display = 'none';
      });
      video[i].addEventListener('mouseover', () => {
        el.style.display = 'block';
      });
      el.addEventListener('mouseover', () => {
        el.style.display = 'block';
      });
    } else {
      el.src = '/assets/imgs/play.png';
      video[i].pause();
      video[i].addEventListener('mouseout', () => {
        el.style.display = 'block';
      });
      el.style.display = 'block';
    }
  });
});

video.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (el.paused) {
      play(video, i);
      control[i].src = '/assets/imgs/pause.png';
      el.addEventListener('mouseout', () => {
        control[i].style.display = 'none';
      });
      el.addEventListener('mouseover', () => {
        control[i].style.display = 'block';
      });
      control[i].addEventListener('mouseover', () => {
        control[i].style.display = 'block';
      });
    } else {
      el.pause();
      control[i].src = '/assets/imgs/play.png';
      el.addEventListener('mouseout', () => {
        control[i].style.display = 'block';
      });
    }
  });

  // update time
  el.addEventListener('timeupdate', (e) => {
    const pos = el.currentTime / el.duration;
    // const minutes = Math.floor(el.duration / 60);
    // const seconds = Math.floor(el.duration - minutes * 60);
    // const curMin = Math.floor(el.currentTime / 60);
    // const curSec = Math.floor(el.currentTime - minutes * 60);

    purpleBar[i].style.width = pos * 100 + '%';
  });
});

progress.forEach((el, i) => {
  el.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / el.offsetWidth) * video[i].duration;
    video[i].currentTime = progressTime;
  });
});

volume.forEach((el, i) => {
  el.value = 100;
  el.addEventListener('mousemove', (e) => {
    const volume = e.target.value / 100;
    video[i].volume = volume;

    if (volume <= 0 ) mute[i].src = '/assets/imgs/volume-mute.png';
    else if (volume > 0) {
      mute[i].src = '/assets/imgs/aumentar-o-volume.png';
    }
  });
});

const rangeInputs = document.querySelectorAll('input[type="range"]');

// funcao handler
const handleInputChange = (e) => {
  const target = e.target;
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
};

rangeInputs.forEach((input) => {
  input.addEventListener('input', handleInputChange);
});

mute.forEach((el, i) => {
  el.addEventListener('click', (e) => {
    if (video[i].volume !== 0) {
      video[i].volume = 0;
      volume[i].value = 0;
      el.src = '/assets/imgs/volume-mute.png';
      rangeInputs[i].style.backgroundSize = '0%';
    } else {
      video[i].volume = 1;
      volume[i].value = 100;
      el.src = '/assets/imgs/aumentar-o-volume.png';
      rangeInputs[i].style.backgroundSize = '100%';
    }
  });
});

volumeBox.forEach((el, i) => {
  el.addEventListener('mouseover', (e) => {
    volume[i].style.left = '25px';
    volume[i].style.transition = 'all ease .3s';
  });

  el.addEventListener('mouseout', () => {
    volume[i].style.left = '-110px';
    volume[i].style.transition = 'all ease .3s';
  });
});

// expand function
expand.forEach((el, i) => {
  el.addEventListener('click', () => {
    console.log('expanded');
    video[i].requestFullscreen();
  });
});
