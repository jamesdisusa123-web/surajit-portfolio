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
  if (points.length > 40) points.shift();
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  if (points.length < 2) return requestAnimationFrame(draw);

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const gradient = ctx.createLinearGradient(
    points[0].x, points[0].y,
    points[points.length - 1].x, points[points.length - 1].y
  );

  gradient.addColorStop(0, "rgba(34,211,238,0.7)");
  gradient.addColorStop(0.5, "rgba(99,102,241,0.6)");
  gradient.addColorStop(1, "rgba(16,185,129,0.5)");

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }

  ctx.stroke();
  requestAnimationFrame(draw);
}

draw();
