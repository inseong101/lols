let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container, index) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const overlay = container.querySelector(".player-mask");
    const button = overlay.querySelector(".replay-button");

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
        onReady: (e) => {
          e.target.playVideo();
          setTimeout(() => {
            overlay.classList.remove("show");
          }, 1000);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            const checkTime = setInterval(() => {
              if (player.getCurrentTime() >= end - 1) {
                overlay.classList.add("show");
                clearInterval(checkTime);
              }
            }, 500);
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
  const unmute = document.querySelector(".unmute-button");
  if (unmute) {
    unmute.addEventListener("click", () => {
      players.forEach(p => {
        if (p.unMute) p.unMute();
      });
    });
  }
});


