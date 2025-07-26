let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const mask = container.querySelector(".player-mask");
    const replayBtn = mask.querySelector(".replay-button");

    let intervalId;

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
            clearInterval(intervalId);
            intervalId = setInterval(() => {
              const currentTime = e.target.getCurrentTime();
              // ✅ 영상 끝나기 1초 전에 가림막
              if (currentTime >= end - 1) {
                mask.classList.add("show");
                clearInterval(intervalId);
              }
            }, 300);
          } else if (
            e.data === YT.PlayerState.ENDED ||
            e.data === YT.PlayerState.PAUSED
          ) {
            clearInterval(intervalId);
          }
        },
      },
    });

    replayBtn.addEventListener("click", () => {
      player.seekTo(start);
      player.playVideo();
      // ✅ 1초 뒤에 가림막 해제
      setTimeout(() => {
        mask.classList.remove("show");
      }, 1000);
    });

    players.push(player);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const unmuteBtn = document.querySelector(".unmute-button");
  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      players.forEach((p) => {
        if (typeof p.unMute === "function") {
          p.unMute();
        }
      });
    });
  }
});
