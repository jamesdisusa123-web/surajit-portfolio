const canvas = document.getElementById("tube-cursor");
const ctx = canvas.getContext("2d");

let width, height;
let trails = [];
let mouse = { x: 0, y: 0 };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  trails.push({
    x: mouse.x,
    y: mouse.y,
    life: 60
  });
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  trails.forEach((p, i) => {
    p.life--;

    const gradient = ctx.createLinearGradient(
      p.x - 20, p.y - 20,
      p.x + 20, p.y + 20
    );

    gradient.addColorStop(0, "rgba(34,211,238,0.6)");
    gradient.addColorStop(0.5, "rgba(99,102,241,0.6)");
    gradient.addColorStop(1, "rgba(16,185,129,0.6)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(
      p.x + Math.sin(p.life * 0.3) * 15,
      p.y + Math.cos(p.life * 0.3) * 15
    );
    ctx.stroke();
  });

  trails = trails.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

animate();
