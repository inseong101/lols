let players = [];
let currentSlide = 0;

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container, index) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const overlay = document.createElement("div");
    overlay.className = "overlay-full";
    const button = document.createElement("button");
    button.className = "replay-button";
    button.innerText = "▶ 다시보기";
    overlay.appendChild(button);
    container.appendChild(overlay);

    const player = new YT.Player(playerDiv, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        start: start,
        end: end,
        enablejsapi: 1,
      },
      events: {
        onReady: (e) => e.target.playVideo(),
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) {
            overlay.classList.add("show");
          }
        },
      },
    });

    button.addEventListener("click", () => {
      overlay.classList.remove("show");
      setTimeout(() => {
        player.seekTo(start);
        player.playVideo();
      }, 1000);
    });

    players.push(player);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // index button 자동 생성
  const buttons = document.getElementById("index-buttons");
  document.querySelectorAll(".slide").forEach((slide, i) => {
    const b = document.createElement("button");
    b.textContent = `${i + 1}번`;
    b.className = "link-button";
    b.onclick = () => showSlide(i);
    buttons.appendChild(b);
  });

  // 음소거 해제 버튼
  const unmute = document.querySelector(".unmute-button");
  if (unmute) {
    unmute.addEventListener("click", () => {
      players.forEach(p => p.unMute());
    });
  }
});

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active-slide", i === n);
  });
  currentSlide = n;
}

function prevSlide() {
  const slides = document.querySelectorAll(".slide");
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function nextSlide() {
  const slides = document.querySelectorAll(".slide");
  showSlide((currentSlide + 1) % slides.length);
}

