import TubesCursor from "https://esm.sh/threejs-components@0.19/cursor/tubes";

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
