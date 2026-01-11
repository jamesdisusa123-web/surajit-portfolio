import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.19/build/cursor/tubes.min.js";

const app = new TubesCursor(document.getElementById("canvas"), {
  tubes: {
    colors: ["#96f7b7", "#53bc28", "#9585d5"],
    radius: 0.6,
    tension: 0.95,
    segments: 160,
    intensity: 260
  },
  lights: {
    colors: ["#83f36e", "#ff8a2e", "#ff008a", "#00aed5"]
  }
});

app.tubes.setFade(0.015);
