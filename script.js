// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("show");
});

// Reveal animation on scroll
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8)
      el.classList.add("visible");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.onload = revealOnScroll;

// Theme toggle
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
if (localStorage.getItem("theme") === "dark")
  document.body.classList.add("dark");
updateTheme();

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  updateTheme();
};

function updateTheme() {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  themeIcon.innerHTML = isDark
    ? `<path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>`;

  hamburger
    .querySelectorAll("span")
    .forEach((span) => (span.style.background = isDark ? "#fff" : "#111"));
}

// ROTUJÍCÍ TEXT
const words = ["weby", "aplikace", "SQL databáze", "e-shopy", "fotografie"];
let currentWord = 0;
let currentChar = 0;
let isDeleting = false;
const element = document.getElementById("rotatingText");
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 1500;

function type() {
  const word = words[currentWord];
  if (!isDeleting) {
    element.textContent = word.substring(0, currentChar + 1);
    currentChar++;
    if (currentChar === word.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }
  } else {
    element.textContent = word.substring(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentWord = (currentWord + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();

// FADE-IN P ELEMENT PO CHVÍLI
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("introSubtitle").classList.add("visible");
  }, 2000); // 2s delay než se p element objeví
});

const section = document.getElementById("effects-section");
const lines = document.querySelectorAll(".grad-line");
const text = document.querySelector(".effects-text");

let animationTriggered = false;

function startAnimation() {
  if (animationTriggered) return;
  animationTriggered = true;

  document.body.classList.add("scroll-lock");

  // animate stripes
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.width = "100%";
    }, i * 300);
  });

  // show text at end
  setTimeout(() => {
    text.style.opacity = 1;
  }, lines.length * 300 + 300);

  // unlock scroll when finished
  setTimeout(() => {
    document.body.classList.remove("scroll-lock");
  }, lines.length * 300 + 1500);
}

function checkSectionPosition() {
  const rect = section.getBoundingClientRect();

  // SPUSTÍ SE DŘÍV – například ve 35 % okna
  const triggerPoint = window.innerHeight * 0;

  if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
    startAnimation();
  }
}

window.addEventListener("scroll", checkSectionPosition);

const slider = document.querySelector(".horizontal-slider");
const handle = document.querySelector(".horizontal-slider .handle");
const light = document.querySelector(".light-mode");
const dark = document.querySelector(".dark-mode");

let isDragging = false;

handle.addEventListener("mousedown", () => (isDragging = true));
document.addEventListener("mouseup", () => (isDragging = false));
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = slider.getBoundingClientRect();
  let x = e.clientX - rect.left;
  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  const percent = x / rect.width;
  handle.style.left = `${x}px`;

  // horizontální odhalení light/dark
  light.style.clipPath = `inset(0 ${100 - percent * 100}% 0 0)`;
  dark.style.clipPath = `inset(0 0 0 ${percent * 100}%)`;
});
