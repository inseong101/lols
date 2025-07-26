let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".video-container").forEach((container) => {
    const videoId = container.dataset.videoId;
    const start = parseInt(container.dataset.start || "0");
    const end = parseInt(container.dataset.end || "9999");

    const playerDiv = container.querySelector(".player");
    const overlay = container.querySelector(".player-mask");
    const button = container.querySelector(".replay-button");

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
            const interval = setInterval(() => {
              const currentTime = player.getCurrentTime();
              if (currentTime >= end - 1) {
                clearInterval(interval);
                overlay.classList.add("show");
              }
            }, 500);
          }
        },
      },
    });

    button.addEventListener("click", () => {
      player.seekTo(start);
      player.playVideo();
      setTimeout(() => {
        overlay.classList.remove("show");
      }, 1000);
    });

    players.push(player);
  });

  // ✅ 소리 켜기 / 끄기 토글
  const unmuteBtn = document.querySelector(".unmute-button");
  if (unmuteBtn) {
    let isMuted = true;
    unmuteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      players.forEach(p => {
        if (isMuted) {
          p.mute();
        } else {
          p.unMute();
        }
      });
      unmuteBtn.textContent = isMuted ? "🔊 소리 켜기" : "🔇 소리 끄기";
    });
  }
}

