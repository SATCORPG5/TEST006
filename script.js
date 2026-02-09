/* --------------------------------------------------------------
   SATCORP – Main JavaScript
   * Dark‑mode toggle (persisted in localStorage)
   * Vanta.js “net” interactive hero background
   * GSAP scroll‑reveal animations
   * Custom cursor motion
   -------------------------------------------------------------- */

/* ==== GLOBALS ==== */
let vantaEffect = null;
let cursor = document.getElementById('custom-cursor');

/* --------------------------------------------------------------
   1️⃣ Dark‑mode toggle – persists across reloads
   -------------------------------------------------------------- */
const THEME_KEY = 'satcorp-theme';
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(mode) {
  if (mode === 'dark') {
    htmlEl.classList.add('dark-mode');
    localStorage.setItem(THEME_KEY, 'dark');
    themeIcon.innerHTML = '<path fill="currentColor" d="M21.64 13.69a1 1 0 0 0-1.11-.41c-2.4.71-4.94-.1-6.71-2.01-1.78-1.9-2.47-4.5-1.81-7.02.16-.64-.28-1.25-.92-1.41a1 1 0 0 0-1.37.73c-.12.51-.23.99-.33 1.45-1.44 6.7 2.86 13.09 9.64 14.51 1.02.2 1.69-.86 1.28-1.78z"/>';
  } else {
    htmlEl.classList.remove('dark-mode');
    localStorage.setItem(THEME_KEY, 'light');
    themeIcon.innerHTML = '<path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.38c.6.112.82-.262.82-.582v-2.17c-3.342.727-4.045-1.61-4.045-1.61-.546-1.38-1.33-1.747-1.33-1.747-1.09-.744.083-.73.083-.73 1.206.084 1.84 1.239 1.84 1.239 1.07 1.836 2.81 1.306 3.493 1.0.108-.782.418-1.306.762-1.606-2.665-.304-5.466-1.334-5.466-5.931 0-1.312.47-2.38 1.237-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.323 3.303 1.23a11.5 11.5 0 0 1 6.013 0c2.295-1.553 3.301-1.23 3.301-1.23.656 1.652.244 2.872.12 3.176.77.84 1.235 1.908 1.235 3.22 0 4.607-2.803 5.624-5.473 5.921.43.37.823 1.1.823 2.219v3.285c0 .322.218.698.825.58A12 12 0 0 0 12 .5z"/>';
  }
}

function loadTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}
themeToggleBtn.addEventListener('click', () => {
  if (htmlEl.classList.contains('dark-mode')) setTheme('light');
  else setTheme('dark');
});
loadTheme();

/* --------------------------------------------------------------
   2️⃣ Vanta.js background on the hero section
   -------------------------------------------------------------- */
function initVanta() {
  if (typeof VANTA === 'undefined') return; // safety check
  vantaEffect = VANTA.NET({
    el: '#hero',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 400,
    minWidth: 200,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00fbff,
    backgroundColor: 0x0e0e0e,
    points: 12,
    maxDistance: 22
  });
}

/* --------------------------------------------------------------
   3️⃣ GSAP scroll‑reveal (fade‑up) for sections
   -------------------------------------------------------------- */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const animateElems = document.querySelectorAll('.section, .footer-section, .hero .cta-btn');

  animateElems.forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  });
}

/* --------------------------------------------------------------
   4️⃣ Custom cursor – follows mouse with easing
   -------------------------------------------------------------- */
function initCustomCursor() {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const speed = 0.15; // smaller = smoother, slower

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------
   5️⃣ Footer Year auto‑update
   -------------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* --------------------------------------------------------------
   6️⃣ Initialize all once DOM is ready
   -------------------------------------------------------------- */
window.addEventListener('load', () => {
  initVanta();
  initScrollAnimations();
  initCustomCursor();
});
