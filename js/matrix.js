console.log("MATRIX JS ACTIVE");

const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();                    // MUST be here
window.addEventListener("resize", resizeCanvas);


const chars = "01アイウエオカキクケコ";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);

function draw() {

 ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "#22d3ee";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);
