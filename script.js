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
  reveals.forEach(el => { if(el.getBoundingClientRect().top < window.innerHeight*0.8) el.classList.add('visible'); });
};
window.addEventListener('scroll', revealOnScroll);
window.onload = revealOnScroll;

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark');
updateTheme();

themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  updateTheme();
};

function updateTheme(){
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark?'dark':'light');

  themeIcon.innerHTML = isDark
    ? `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>`
    : `<circle cx="12" cy="12" r="6"></circle>
       <line x1="12" y1="1" x2="12" y2="3"/>
       <line x1="12" y1="21" x2="12" y2="23"/>
       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
       <line x1="1" y1="12" x2="3" y2="12"/>
       <line x1="21" y1="12" x2="23" y2="12"/>
       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;

  hamburger.querySelectorAll('span').forEach(span=>span.style.background=isDark?'#fff':'#111');
}

// Interaktivní pozadí
for(let i=0;i<30;i++){
  const dot = document.createElement('div');
  dot.className='bg-dot';
  dot.style.top=`${Math.random()*100}%`;
  dot.style.left=`${Math.random()*100}%`;
  dot.style.width=`${5 + Math.random()*15}px`;
  dot.style.height=dot.style.width;
  dot.style.animationDuration=`${4 + Math.random()*6}s`;
  document.body.appendChild(dot);
}

document.body.addEventListener('mousemove', e => {
  document.querySelectorAll('.bg-dot').forEach(dot=>{
    const dx = (e.clientX - window.innerWidth/2)/50;
    const dy = (e.clientY - window.innerHeight/2)/50;
    dot.style.transform = `translate(${dx}px, ${dy}px)`;
  });
});



// ROTUJÍCÍ TEXT
const words = ["weby", "aplikace", "digitální produkty"];
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
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('introSubtitle').classList.add('visible');
  }, 2000); // 2s delay než se p element objeví
});