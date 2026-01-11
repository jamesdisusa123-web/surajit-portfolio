const canvas = document.getElementById("tube-cursor");
const ctx = canvas.getContext("2d");

let w, h;
let mouse = { x: 0, y: 0 };
let points = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  points.push({ x: mouse.x, y: mouse.y, life: 100 });
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.life--;

    const gradient = ctx.createLinearGradient(
      p.x - 30,
      p.y - 30,
      p.x + 30,
      p.y + 30
    );

    gradient.addColorStop(0, "rgba(34,211,238,0.6)");
    gradient.addColorStop(0.5, "rgba(99,102,241,0.6)");
    gradient.addColorStop(1, "rgba(16,185,129,0.6)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + Math.sin(p.life) * 20, p.y + Math.cos(p.life) * 20);
    ctx.stroke();
  }

  points = points.filter(p => p.life > 0);
  requestAnimationFrame(draw);
}

draw();
