const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const countdownEl = document.getElementById('countdown');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const flames = document.querySelectorAll('.flame');
const intro = document.getElementById('intro');
const originalIntroHTML = intro.innerHTML;
let countdownInterval;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.opacity = 0;

function startSequence() {
  startBtn.style.display = 'none';
  let count = 3;
  countdownEl.textContent = `Blow candles in ${count}...`;

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = `Blow candles in ${count}...`;
    } else {
      clearInterval(countdownInterval);
      countdownEl.textContent = '';
      blowCandles();
    }
  }, 1000);
}

function blowCandles() {
  flames.forEach(f => f.style.display = 'none');
  messageEl.textContent = '🎉 Happy Birthday!!! 🎉';
  launchFireworks();

  // Fade out intro
  setTimeout(() => {
    intro.style.opacity = 0;
  }, 1500);

  // Replace with love message
  setTimeout(() => {
    intro.innerHTML = "I love youuuu soooo much, let's spend the next one together!";
    intro.style.opacity = 1;
  }, 2500);

  // Show replay button
  setTimeout(() => {
    restartBtn.style.display = 'inline-block';
  }, 4000);
}

function reset() {
  clearInterval(countdownInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.opacity = 0;
  messageEl.textContent = '';
  countdownEl.textContent = '';
  restartBtn.style.display = 'none';
  startBtn.style.display = 'inline-block';
  flames.forEach(f => f.style.display = 'block');
  intro.innerHTML = originalIntroHTML;
  intro.style.opacity = 1;
}

function launchFireworks() {
  canvas.style.opacity = 1;
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 60%, 85%)`;
    drawBurst(x, y, color);
  }
}

function drawBurst(x, y, color) {
  const radius = 2 + Math.random() * 4;
  const particles = 25;
  for (let i = 0; i < particles; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 4 + 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    animateParticle(x, y, vx, vy, color, radius);
  }
}

function animateParticle(x, y, vx, vy, color, radius) {
  let alpha = 1;
  const fade = 0.02;
  function frame() {
    if (alpha <= 0) return;
    ctx.fillStyle = `rgba(31,16,37,0.15)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
    x += vx;
    y += vy;
    vy += 0.1;
    alpha -= fade;
    requestAnimationFrame(frame);
  }
  frame();
}
