// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("show");
});

// Reveal animation on scroll
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.onload = revealOnScroll;

// Theme toggle with smooth icon animation
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
updateTheme();

themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  updateTheme();
};

function updateTheme() {
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Hezčí SVG animace přechodu
  themeIcon.innerHTML = isDark
    ? `<circle cx="12" cy="12" r="9" fill="currentColor"/>` // měsíc
    : `<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/>`; // slunce

  hamburger.querySelectorAll('span').forEach(span => span.style.background = isDark ? '#fff' : '#111');
}

// Interaktivní pozadí
const dots = [];
for (let i = 0; i < 30; i++) {
  const dot = document.createElement('div');
  dot.className = 'bg-dot';
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.left = `${Math.random() * 100}%`;
  const size = 5 + Math.random() * 15;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.animationDuration = `${4 + Math.random() * 6}s`;
  document.body.appendChild(dot);
  dots.push(dot);
}

// Plynulý pohyb teček s requestAnimationFrame
let mouseX = 0, mouseY = 0;
document.body.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateDots() {
  const dx = (mouseX - window.innerWidth / 2) / 50;
  const dy = (mouseY - window.innerHeight / 2) / 50;
  dots.forEach(dot => dot.style.transform = `translate(${dx}px, ${dy}px)`);
  requestAnimationFrame(animateDots);
}
animateDots();
