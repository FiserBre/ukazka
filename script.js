// ROTUJÍCÍ text v hero
const words = ["weby","aplikace","digitální produkty"];
let currentWord = 0, currentChar = 0, isDeleting = false;
const rotatingEl = document.getElementById("rotatingText");
const typingSpeed = 100, deletingSpeed = 50, delayBetween = 1500;

function typeLoop(){
  const word = words[currentWord];
  if (!isDeleting) {
    rotatingEl.textContent = word.substring(0, currentChar + 1);
    currentChar++;
    if (currentChar === word.length) {
      isDeleting = true;
      setTimeout(typeLoop, delayBetween);
      return;
    }
  } else {
    rotatingEl.textContent = word.substring(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentWord = (currentWord + 1) % words.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
}
typeLoop();

// reveal-on-scroll pro sekce
const revealEls = document.querySelectorAll(".reveal-global");
function revealOnScroll(){
  revealEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// hover mikro-interakce tlačítka – handled přes CSS

// Demo: scroll-reveal pro .reveal-demo v Services
const revealDemos = document.querySelectorAll(".reveal-demo");
function revealDemoOnScroll(){
  revealDemos.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealDemoOnScroll);
window.addEventListener("load", revealDemoOnScroll);

// Hamburger menu (pokud máš stejnou strukturu)
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("show");
});