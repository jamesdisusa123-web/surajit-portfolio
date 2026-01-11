(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  let points = [];
  let mouse = { x: 0, y: 0 };
  let active = false;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    active = true;
    points.push({ x: mouse.x, y: mouse.y, life: 1 });
    if (points.length > 80) points.shift();
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const n = points[i + 1];

      p.life *= 0.96;
      if (p.life < 0.02) continue;

      const gradient = ctx.createLinearGradient(p.x, p.y, n.x, n.y);
      gradient.addColorStop(0, "rgba(34,211,238," + p.life + ")");
      gradient.addColorStop(0.5, "rgba(99,102,241," + p.life + ")");
      gradient.addColorStop(1, "rgba(16,185,129," + p.life + ")");

      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
    }

    if (active) {
      points = points.filter(p => p.life > 0.02);
      if (points.length === 0) active = false;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
