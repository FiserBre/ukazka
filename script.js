// ===================== HAMBURGER TOGGLE =====================
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("show");
});

// ===================== REVEAL ON SCROLL =====================
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8)
      el.classList.add("visible");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===================== THEME TOGGLE =====================
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

// ===================== ROTATING TEXT =====================
const words = ["weby", "aplikace", "SQL databáze", "e-shopy", "fotografie"];
let currentWord = 0,
  currentChar = 0,
  isDeleting = false;
const element = document.getElementById("rotatingText");
const typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500;

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

// ===================== FADE-IN INTRO SUBTITLE =====================
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const subtitle = document.getElementById("introSubtitle");
    if (subtitle) subtitle.classList.add("visible");
  }, 2000);
});

// ===================== EFFECTS SECTION =====================
const section = document.getElementById("effects-section");
const lines = document.querySelectorAll(".grad-line");
const text = document.querySelector(".effects-text");

let animationTriggered = false;
let scrollLocked = false;

function lockScroll() {
  scrollLocked = true;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}
function unlockScroll() {
  scrollLocked = false;
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function startAnimation() {
  if (animationTriggered) return;
  animationTriggered = true;
  lockScroll();

  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.width = "100%";
    }, i * 300);
  });

  setTimeout(() => (text.style.opacity = 1), lines.length * 300 + 300);
  setTimeout(unlockScroll, lines.length * 300 + 1500);
}

function checkSectionPosition() {
  if (animationTriggered) return;
  const rect = section.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0) startAnimation();
}

function preventScroll(e) {
  if (scrollLocked) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

window.addEventListener("scroll", checkSectionPosition);
window.addEventListener("wheel", preventScroll, { passive: false });
window.addEventListener("touchmove", preventScroll, { passive: false });
window.addEventListener(
  "keydown",
  (e) => {
    if (
      scrollLocked &&
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(e.code)
    )
      e.preventDefault();
  },
  { passive: false }
);
window.addEventListener("load", checkSectionPosition);

// ===================== HORIZONTAL SLIDER (DESKTOP + MOBILE) =====================
const slider = document.querySelector(".horizontal-slider");
const handle = slider.querySelector(".handle");
const light = document.querySelector(".light-mode");
const dark = document.querySelector(".dark-mode");

let isDragging = false;

// --------- HELPER FUNCTION ---------
function updateSlider(x) {
  const rect = slider.getBoundingClientRect();
  let posX = x - rect.left;
  if (posX < 0) posX = 0;
  if (posX > rect.width) posX = rect.width;

  const percent = posX / rect.width;
  handle.style.left = `${percent * 100}%`;
  light.style.clipPath = `inset(0 ${100 - percent * 100}% 0 0)`;
  dark.style.clipPath = `inset(0 0 0 ${percent * 100}%)`;
}

// --------- DESKTOP EVENTS ---------
handle.addEventListener("mousedown", () => {
  isDragging = true;
  slider.classList.add("dragging");
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  slider.classList.remove("dragging");
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) updateSlider(e.clientX);
});

// --------- TOUCH EVENTS ---------
handle.addEventListener("touchstart", () => {
  isDragging = true;
  slider.classList.add("dragging");
});
document.addEventListener("touchend", () => {
  isDragging = false;
  slider.classList.remove("dragging");
});
document.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
    e.preventDefault(); // zabraňuje scrollu
  },
  { passive: false }
);

// ===================== GENERATE PRODUCTS =====================
const products = [
  { name: "Iphone 15 Pro", img: "iphone-15-pro-max.jpg" },
  { name: "Adidas Ultraboost", img: "Adidas.jpg" },
  { name: "Apple Watch", img: "AppleWatch.jpg" },
  { name: "Gaming Mouse", img: "mouse.jpg" },
  { name: "Perfume Dior", img: "dior.jpg" },
  { name: "Keyboard RGB", img: "hyperx.jpg" },
  { name: "JBL Headphones", img: "jbl.jpg" },
  { name: "Backpack Urban", img: "peak.jpg" },
];

function generateStars() {
  let count = Math.floor(Math.random() * 5) + 1;
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function generateProduct(product) {
  return `
    <div class="product-card">
      <img src="${product.img}" class="product-img" alt="${product.name}">
      <div class="product-title">${product.name}</div>
      <div class="stars">
        ${generateStars()
          .split("")
          .map((s) => `<span>${s}</span>`)
          .join("")}
      </div>
    </div>
  `;
}

document.querySelectorAll(".product-track").forEach((track) => {
  let html = "";
  products.forEach((product) => {
    html += generateProduct(product);
  });

  track.innerHTML = html;

  // duplikace pro nekonečný efekt
  const clone = track.cloneNode(true);
});
