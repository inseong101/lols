let players = [];
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function onYouTubeIframeAPIReady() {
  const containers = document.querySelectorAll(".video-container");
  containers.forEach((container) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start);
    const end = parseInt(container.dataset.end);
    const playerDiv = container.querySelector(".player");

    const player = new YT.Player(playerDiv, {
      videoId: videoId,
      playerVars: {
        start: start,
        end: end,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        controls: 1,
        enablejsapi: 1
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          setTimeout(() => {
            const overlayTop = container.querySelector(".overlay-top");
            if (overlayTop) overlayTop.style.display = "none";
          }, 1000);
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            const overlayFull = container.querySelector(".overlay-full");
            if (overlayFull) overlayFull.style.display = "flex";
          }
        }
      }
    });
    players.push({ player, start, container });
  });
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("replay-button")) {
    const overlay = e.target.closest(".overlay-full");
    const container = overlay.closest(".video-container");
    const playerIndex = Array.from(document.querySelectorAll(".video-container")).indexOf(container);
    const { player, start } = players[playerIndex];
    overlay.style.display = "none";
    player.seekTo(start);
    player.playVideo();
  }
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active-slide", i === index);
  });
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".video-wrapper");
  const indexDiv = document.getElementById("index-buttons");

  wrappers.forEach((wrapper, idx) => {
    const title = wrapper.querySelector("h2").innerText;
    const id = wrapper.id || `q${idx + 1}`;
    wrapper.id = id;

    const a = document.createElement("a");
    a.className = "link-button";
    a.href = "#";
    a.innerText = title;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentSlide = idx;
      showSlide(currentSlide);
    });

    indexDiv.appendChild(a);
  });
});
