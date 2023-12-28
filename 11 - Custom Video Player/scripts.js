// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// Build out functions
function togglePlay () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  };
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate () {
  video[this.name] = this.value;
};

function handleProgress () {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub (e) {
  console.log(e);
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function handleFullscreen () {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch();
  } else {
    player.requestFullscreen().catch();
  };
};

function fullscreenToggled () {
  if (document.fullscreenElement) {
    fullscreen.textContent = '🮻';
  } else {
    fullscreen.textContent = '⛶';
  };

}

// Hook up events
video.addEventListener('click', togglePlay);
video.addEventListener('pause', () => toggle.textContent = '►');
video.addEventListener('play', () => toggle.textContent = '⏸');
video.addEventListener('timeupdate', handleProgress);

player.addEventListener('fullscreenchange', fullscreenToggled);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', handleFullscreen);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));