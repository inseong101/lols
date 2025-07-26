let players = [];
let currentSlide = 0;

function onYouTubeIframeAPIReady() {
  const containers = document.querySelectorAll('.video-container');
  containers.forEach((container, index) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start);
    const end = parseInt(container.dataset.end);
    const playerDiv = container.querySelector('.player');
    const overlay = container.querySelector('.overlay-full');
    const mask = container.querySelector('.player-mask');

    const player = new YT.Player(playerDiv, {
      videoId: videoId,
      playerVars: {
        start: start,
        end: end,
        rel: 0,
        modestbranding: 1,
        controls: 1,
        autoplay: 0,
        mute: 0,
        enablejsapi: 1
      },
      events: {
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            overlay.classList.add('show');
          }
        }
      }
    });

    overlay.querySelector('.replay-button').addEventListener('click', () => {
      overlay.classList.add('show');

      setTimeout(() => {
        overlay.classList.remove('show');
        player.seekTo(start);
        player.playVideo();
      }, 1000);
    });

    players.push(player);
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove('active-slide');
  currentSlide = index;
  slides[currentSlide].classList.add('active-slide');
}

function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const indexButtons = document.getElementById('index-buttons');
  const slides = document.querySelectorAll('.slide');

  slides.forEach((slide, idx) => {
    const btn = document.createElement('a');
    btn.className = 'link-button';
    btn.textContent = slide.querySelector('h2').textContent;
    btn.href = '#';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(idx);
    });
    indexButtons.appendChild(btn);
  });

  showSlide(0);
});


