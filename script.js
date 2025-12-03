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
    ? `<path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
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
