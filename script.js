let players = [];

function initPlayers() {
  document.querySelectorAll(".video-container").forEach((container, index) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");
    const playerDiv = container.querySelector(".player");
    const mask = container.querySelector(".player-mask");
    const replayButton = mask.querySelector(".replay-button");

    // 가림막 초기 상태: 숨김
    mask.classList.remove("show");

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
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            // 영상 끝 1초 전에 가림막 표시
            const interval = setInterval(() => {
              if (
                player.getCurrentTime &&
                player.getDuration &&
                player.getCurrentTime() >= end - 1
              ) {
                mask.classList.add("show");
                clearInterval(interval);
              }
            }, 500);
          }
        },
      },
    });

    replayButton.addEventListener("click", () => {
      player.seekTo(start);
      player.playVideo();
      setTimeout(() => {
        mask.classList.remove("show");
      }, 1000);
    });

    players.push(player);
  });

  const unmuteBtn = document.querySelector(".unmute-button");
  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      players.forEach((p) => {
        if (p.unMute) p.unMute();
      });
      unmuteBtn.innerText = "🔇 소리 끄기";
      unmuteBtn.onclick = () => {
        players.forEach((p) => {
          if (p.mute) p.mute();
        });
        unmuteBtn.innerText = "🔊 소리 켜기";
        initPlayers(); // 다시 버튼 연결
      };
    });
  }
}

// ✅ 안정적으로 API 로드될 때까지 대기
function waitForYouTubeAPI(callback) {
  if (window.YT && YT.Player) {
    callback();
  } else {
    setTimeout(() => waitForYouTubeAPI(callback), 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  waitForYouTubeAPI(initPlayers);
});

