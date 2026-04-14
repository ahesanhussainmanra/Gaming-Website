document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseover", () => {
    card.style.transform = "scale(1.1)";
  });

  card.addEventListener("mouseout", () => {
    card.style.transform = "scale(1)";
  });
});
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);
let elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    let position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();