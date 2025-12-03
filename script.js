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
    : `<path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

  hamburger.querySelectorAll('span').forEach(span=>span.style.background=isDark?'#fff':'#111');
}
