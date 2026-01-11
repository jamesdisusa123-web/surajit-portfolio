const canvas = document.getElementById("tube-cursor");
const ctx = canvas.getContext("2d");

let w, h;
let points = [];
let lastMoveTime = Date.now();

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  lastMoveTime = Date.now();

  points.push({
    x: e.clientX,
    y: e.clientY,
    life: 1 // opacity
  });

  if (points.length > 60) points.shift();
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.shadowBlur = 18;
  ctx.shadowColor = "rgba(34,211,238,0.8)";

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    // Fade logic
    const timeSinceMove = Date.now() - lastMoveTime;
    if (timeSinceMove > 50) {
      p1.life -= 0.03;
    }

    if (p1.life <= 0) continue;

    const gradient = ctx.createLinearGradient(
      p1.x, p1.y,
      p2.x, p2.y
    );

    gradient.addColorStop(0, `rgba(34,211,238,${p1.life})`);
    gradient.addColorStop(0.5, `rgba(99,102,241,${p1.life})`);
    gradient.addColorStop(1, `rgba(16,185,129,${p1.life})`);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  // Remove dead points
  points = points.filter(p => p.life > 0);

  requestAnimationFrame(draw);
}

draw();
