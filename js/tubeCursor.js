const canvas = document.getElementById("tube-cursor");
const ctx = canvas.getContext("2d");

let w, h;
let points = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  points.push({ x: e.clientX, y: e.clientY });
  if (points.length > 50) points.shift();
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Glow
  ctx.shadowBlur = 18;
  ctx.shadowColor = "rgba(34,211,238,0.8)";

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    const gradient = ctx.createLinearGradient(
      p1.x, p1.y,
      p2.x, p2.y
    );

    gradient.addColorStop(0, "rgba(34,211,238,0.9)"); // cyan
    gradient.addColorStop(0.5, "rgba(99,102,241,0.9)"); // blue
    gradient.addColorStop(1, "rgba(16,185,129,0.9)"); // green

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

draw();
