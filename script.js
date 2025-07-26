let players = [];

function onYouTubeIframeAPIReady() {
  const containers = document.querySelectorAll('.video-container');

  containers.forEach((container, index) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start, 10);
    const end = parseInt(container.dataset.end, 10);

    const playerDiv = container.querySelector('.player');
    const overlay = container.querySelector('.overlay-full');
    const mask = container.querySelector('.player-mask');

    const player = new YT.Player(playerDiv, {
      videoId,
      playerVars: {
        start,
        end,
        rel: 0,
        modestbranding: 1,
        controls: 1,
        autoplay: 0
      },
      events: {
        onReady: () => {
          // 최초 시작 시 overlay 보여줌
          overlay.classList.add('show');
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            overlay.classList.add('show');
          }
        }
      }
    });

    overlay.querySelector('.replay-button').addEventListener('click', () => {
      player.seekTo(start);
      player.playVideo();

      overlay.classList.remove('show');

      // 1초 뒤에 mask를 보여줌 (썸네일 방지용)
      mask.style.display = 'block';
      setTimeout(() => {
        mask.style.display = 'none';
      }, 1000);
    });

    players.push(player);
  });
}

// 슬라이드 이동
let currentSlide = 0;
function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove('active-slide');
  slides[index].classList.add('active-slide');
  currentSlide = index;
}
function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

// 자동 인덱스 버튼 생성
window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const container = document.getElementById('index-buttons');

  slides.forEach((slide, i) => {
    const btn = document.createElement('a');
    btn.href = `#q${i + 1}`;
    btn.className = 'link-button';
    btn.textContent = slide.querySelector('h2').textContent;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(i);
    });
    container.appendChild(btn);
  });
});

