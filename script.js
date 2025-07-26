body {
  margin: 0;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-family: sans-serif;
  scroll-behavior: smooth;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.link-button {
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}

.link-button:hover {
  background-color: #555;
}

.video-wrapper {
  max-width: 720px;
  margin: 0 auto 40px auto;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  background: black;
  margin-bottom: 10px;
}

.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.player-mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: black;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mask-label {
  font-size: 18px;
  color: white;
}

.overlay-full {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.overlay-full.show {
  display: flex;
}

.replay-button {
  background: #fff;
  color: #000;
  font-size: 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.unmute-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 10px;
  background-color: #4eaaff;
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.slide {
  display: none;
}

.slide.active-slide {
  display: block;
}
