// getting the elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.fullscreen');
let fullscreen = false

// writing the functions
function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updatePlayButton(){
	let buttonType = video.paused ? '►' : '❚ ❚';
	toggle.textContent = buttonType;
}
function skip(){
	video.currentTime += parseFloat(this.dataset.skip)
}
function updateRange(){
	video[this.name] = this.value;
}
function handleProgress(){
	const updatedTime = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${updatedTime}%`;
}
function scrub(e){
	const scrubUpdate = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubUpdate;
}
function toggleFullScreen() {
	if (!document.fullscreenElement) {
      player.requestFullscreen();
      fullscreenBtn.querySelector('i').classList.remove('fa-expand')
      fullscreenBtn.querySelector('i').classList.add('fa-compress')
  } else {
      document.exitFullscreen(); 
      fullscreenBtn.querySelector('i').classList.add('fa-expand')
      fullscreenBtn.querySelector('i').classList.remove('fa-compress')

  }
}

function controlFromKeyBoard(e){

	// pause or play with the space key
	if(e.keyCode === 32) {togglePlay();} 

	// toggle fullscreen with the f key
	if(e.keyCode === 70) {toggleFullScreen();} 
}

// listening to the events
video.addEventListener('click', togglePlay)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('play', updatePlayButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', updateRange))
ranges.forEach(range => range.addEventListener('mousemove', updateRange))
let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', ()=>mousedown = true)
progress.addEventListener('mouseup', ()=>mousedown = false)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
window.addEventListener('keydown', controlFromKeyBoard);
window.addEventListener('load', handleProgress);
fullscreenBtn.addEventListener('click', toggleFullScreen)
video.addEventListener('dblclick', toggleFullScreen)
