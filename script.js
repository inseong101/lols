let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const mask = container.querySelector(".player-mask");
    const replayBtn = mask.querySelector(".replay-button");

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
          // 시작 시 가림막 무조건 숨김
          mask.classList.remove("show");
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            // 매초마다 현재 시간을 체크하여 끝나기 1초 전에 마스크 표시
            const interval = setInterval(() => {
              const currentTime = e.target.getCurrentTime();
              if (currentTime >= end - 1) {
                mask.classList.add("show");
                clearInterval(interval); // 한 번만 실행
              }
            }, 500);
          }
        }
      }
    });

    // 다시보기 버튼 클릭 시
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

// 음소거 해제 버튼
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

