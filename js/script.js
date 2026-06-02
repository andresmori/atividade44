// ===== DARK MODE =====
const html = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

darkToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') !== 'dark');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== STICKY HEADER SHADOW =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.12)'
    : '0 2px 12px rgba(0,0,0,0.06)';
});

// ===== CART TOAST =====
const toast = document.getElementById('toast');
let toastTimer;

function addCart(btn) {
  clearTimeout(toastTimer);
  btn.textContent = '✓ Adicionado!';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Comprar';
    btn.style.background = '';
  }, 1800);

  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .about-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, box-shadow 0.25s ease`;
  observer.observe(el);
});

// ===== CAROUSEL DOTS (decorative) =====
const grid = document.getElementById('productsGrid');
const dotsContainer = document.getElementById('carouselDots');
if (grid && dotsContainer) {
  const count = Math.ceil(grid.children.length / 3);
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  }
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
