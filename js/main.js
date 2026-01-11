import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.19/build/cursor/tubes.min.js";

console.log("main.js loaded");

new TubesCursor(document.getElementById("canvas"), {
  tubes: {
    colors: ["#22d3ee", "#6366f1", "#10b981"],
    radius: 0.6,
    tension: 0.95,
    segments: 160,
    intensity: 260
  },
  lights: {
    colors: ["#22d3ee", "#6366f1", "#10b981"]
  }
});
