import './style.css';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { applyTranslations, toggleLang, getCurrentLang, getNavLabel } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

// ============ LENIS SMOOTH SCROLL ============
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ============ HERO PARALLAX ============
const heroVideo = document.querySelector('.hero__video');

if (heroVideo) {
  gsap.to(heroVideo, {
    yPercent: 20,
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });
}

// ============ HERO TITLE LINE REVEAL ============
const heroLines = document.querySelectorAll('.hero__title .line-reveal');
heroLines.forEach((line, i) => {
  gsap.fromTo(line,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1,
      delay: 0.3 + i * 0.15,
      ease: 'power3.out',
    }
  );
});

// ============ HERO OVERLAY ============
const heroOverlay = document.querySelector('.hero__overlay-row');
if (heroOverlay) {
  gsap.from(heroOverlay, {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out',
  });
}

// ============ SECTION LABEL ANIMATIONS ============
document.querySelectorAll('.section-label').forEach((label) => {
  if (label.closest('.hero')) return;

  gsap.from(label, {
    opacity: 0,
    y: 15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: label,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
});

// ============ REVEAL TEXT ANIMATIONS ============
document.querySelectorAll('.reveal-text').forEach((heading) => {
  const spans = heading.querySelectorAll('span');

  spans.forEach((span, i) => {
    gsap.from(span, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
});

// ============ ABOUT SECTION ============
const aboutMarker = document.querySelector('.about__marker');
if (aboutMarker) {
  gsap.from(aboutMarker, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
    },
  });
}

const aboutBtn = document.querySelector('.about .btn');
if (aboutBtn) {
  gsap.from(aboutBtn, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 60%',
    },
  });
}

// ============ COLLECTION CARDS ============
document.querySelectorAll('.collection__card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 80,
    scale: 0.95,
    duration: 1,
    delay: i * 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.collection__grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  const speed = parseFloat(card.dataset.speed) || 1;
  gsap.to(card, {
    y: (1 - speed) * 120,
    ease: 'none',
    scrollTrigger: {
      trigger: card,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  });
});

const collectionInfo = document.querySelector('.collection__info');
if (collectionInfo) {
  gsap.from(collectionInfo, {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: collectionInfo,
      start: 'top 80%',
    },
  });
}

// ============ STUDIO SECTION ============
const showroomImg = document.querySelector('.showroom__img');
if (showroomImg) {
  gsap.from('.showroom__image-wrap', {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.showroom',
      start: 'top 70%',
    },
  });

  gsap.to(showroomImg, {
    scale: 1.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '.showroom',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    },
  });
}

// ============ OFFERING ROWS ============
document.querySelectorAll('.project-row').forEach((row, i) => {
  gsap.from(row, {
    opacity: 0,
    x: -20,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: row,
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  });
});

// ============ STORIES IMAGES ============
document.querySelectorAll('.stories__img-wrap').forEach((wrap, i) => {
  gsap.from(wrap, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stories',
      start: 'top 70%',
    },
  });
});

// ============ PRICING CARDS ============
document.querySelectorAll('.pricing__card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.pricing__grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
});

// ============ BOOKING SECTION ============
const bookingText = document.querySelector('.booking__text');
if (bookingText) {
  gsap.from(bookingText, {
    opacity: 0,
    x: -30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.booking',
      start: 'top 75%',
    },
  });
}

// ============ FOOTER WATERMARK ============
const footerWatermark = document.querySelector('.footer__watermark');
if (footerWatermark) {
  gsap.from(footerWatermark, {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer__brand',
      start: 'top 90%',
    },
  });
}

// ============ TESTIMONIAL CAROUSEL ============
const slides = document.querySelectorAll('.stories__slide');
const counter = document.querySelector('.stories__counter');
const prevBtn = document.getElementById('stories-prev');
const nextBtn = document.getElementById('stories-next');
let currentSlide = 0;

function updateCarousel(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('stories__slide--active');
    if (i === index) {
      slide.classList.add('stories__slide--active');
    }
  });
  if (counter) {
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
  });
}

// ============ HAMBURGER MENU ============
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-overlay__link');

function setMenuOpen(open) {
  menuToggle.classList.toggle('active', open);
  menuOverlay.classList.toggle('active', open);
  menuOverlay.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  open ? lenis.stop() : lenis.start();
}

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    setMenuOpen(!menuOverlay.classList.contains('active'));
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

// ============ NAV LABEL UPDATE ON SCROLL ============
const pillLabel = document.querySelector('.pill-nav__label');
let activeSectionId = 'hero';

const sectionIds = ['hero', 'about', 'classes', 'studio', 'offerings', 'stories', 'pricing', 'booking'];

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      activeSectionId = id;
      if (pillLabel) pillLabel.textContent = getNavLabel(id);
    },
    onEnterBack: () => {
      activeSectionId = id;
      if (pillLabel) pillLabel.textContent = getNavLabel(id);
    },
  });
});

// ============ LANGUAGE TOGGLE ============
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    toggleLang();
    if (pillLabel) pillLabel.textContent = getNavLabel(activeSectionId);
  });
}

applyTranslations(getCurrentLang());

// ============ HEADER HIDE ON SCROLL ============
const header = document.querySelector('.header');

lenis.on('scroll', ({ scroll }) => {
  if (!header) return;
  if (scroll > 100) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }
});

if (header) {
  header.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      lenis.scrollTo(target, { offset: 0 });
    }
  });
});
