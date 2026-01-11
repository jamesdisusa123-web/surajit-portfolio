const canvas = document.getElementById("tube-cursor");
const ctx = canvas.getContext("2d");

let w, h;
let trails = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  trails.push({
    x: e.clientX,
    y: e.clientY,
    alpha: 1
  });
});

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < trails.length - 1; i++) {
    const p1 = trails[i];
    const p2 = trails[i + 1];

    const gradient = ctx.createLinearGradient(
      p1.x, p1.y,
      p2.x, p2.y
    );

    gradient.addColorStop(0, "rgba(34,211,238," + p1.alpha + ")");
    gradient.addColorStop(0.5, "rgba(99,102,241," + p1.alpha + ")");
    gradient.addColorStop(1, "rgba(16,185,129," + p1.alpha + ")");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    p1.alpha -= 0.02;
  }

  trails = trails.filter(p => p.alpha > 0);
  requestAnimationFrame(draw);
}

draw();
