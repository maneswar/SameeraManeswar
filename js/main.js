// ===================================================
// Maneswar & Sameera — Wedding Invitation Interactions
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 900);
  });
  // fallback in case load event already fired
  setTimeout(() => preloader.classList.add('hide'), 2500);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Floating petals ---------- */
  const petalsLayer = document.getElementById('petalsLayer');
  const petalColors = ['#e07a2c', '#c79a3d', '#7a1428', '#f3d47a'];
  const PETAL_COUNT = window.innerWidth < 700 ? 14 : 26;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    const size = 8 + Math.random() * 10;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = petalColors[i % petalColors.length];
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 14) + 's';
    petalsLayer.appendChild(p);
  }

  /* ---------- Countdown ---------- */
  const weddingDate = new Date('2026-08-27T11:06:00+05:30').getTime();
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins = document.getElementById('cd-mins');
  const elSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tickCountdown() {
    const now = Date.now();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Hero mango-leaf toran generation ---------- */
  const leafRow = document.querySelector('.leaf-row');
  if (leafRow) {
    const total = 30;
    for (let i = 0; i < total; i++) {
      const t = i / (total - 1);
      const x = t * 1200;
      const y = 10 + Math.sin(t * Math.PI) * 46 + Math.sin(t * Math.PI * 3) * 4;
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#mangoLeaf');
      use.setAttribute('x', x);
      use.setAttribute('y', y);
      use.setAttribute('transform', `rotate(${(t - 0.5) * 40} ${x} ${y})`);
      leafRow.appendChild(use);
    }
  }

  /* ---------- Subtle hero parallax ---------- */
  const mandalas = document.querySelectorAll('.mandala');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    mandalas.forEach((m, i) => {
      m.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
    });
  }, { passive: true });

});
