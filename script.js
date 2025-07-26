let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const mask = container.querySelector(".player-mask");
    const replayBtn = mask.querySelector(".replay-button");

    let checkInterval;

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
          mask.classList.remove("show");
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            // 재생될 때 타이머 실행
            clearInterval(checkInterval);
            checkInterval = setInterval(() => {
              const currentTime = e.target.getCurrentTime();
              if (currentTime >= end - 1) {
                mask.classList.add("show");
                clearInterval(checkInterval); // 한 번만 실행되도록
              }
            }, 250);
          } else if (
            e.data === YT.PlayerState.ENDED ||
            e.data === YT.PlayerState.PAUSED
          ) {
            clearInterval(checkInterval); // 멈춤/끝났을 때도 타이머 종료
          }
        }
      }
    });

    replayBtn.addEventListener("click", () => {
      mask.classList.remove("show");
      setTimeout(() => {
        player.seekTo(start);
        player.playVideo();
      }, 1000);
    });

    players.push(player);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const unmuteBtn = document.querySelector(".unmute-button");
  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      players.forEach(p => {
        if (typeof p.unMute === "function") {
          p.unMute();
        }
      });
    });
  }
});

