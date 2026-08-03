/* ============================================================
   Kanya's Pleating — script.js
   - Mobile nav toggle
   - Smooth scroll for anchor links
   - WhatsApp-based contact form flow
   ============================================================ */

// ── Mobile nav toggle ──────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const expanded = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', expanded);
  });

  // Close when a mobile link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Footer year ────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Smooth scroll ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // height of fixed nav
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Active nav highlight on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('header nav a[href^="#"]');

function onScroll() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('text-primary');
        link.classList.add('text-dark/70');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('text-primary');
          link.classList.remove('text-dark/70');
        }
      });
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── WhatsApp inquiry form ───────────────────────────────────

/**
 * IMPORTANT — Replace this with the actual WhatsApp number
 * Format: country code + number, no spaces, no "+" prefix
 * Example: India +91 98765 43210 → "919876543210"
 */
const WHATSAPP_NUMBER = '+1 424 537 7352'; // ← Update this

const form = document.getElementById('inquiry-form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Gather values
    const name      = form.querySelector('#name').value.trim();
    const phone     = form.querySelector('#phone').value.trim();
    const eventDate = form.querySelector('#event-date').value;
    const message   = form.querySelector('#message').value.trim();

    // Validate required fields
    let valid = true;

    function setError(fieldId, hasError) {
      const field = form.querySelector(`#${fieldId}`);
      const errEl = field?.nextElementSibling;
      if (!field || !errEl) return;
      if (hasError) {
        field.classList.add('border-red-400');
        errEl.classList.remove('hidden');
        valid = false;
      } else {
        field.classList.remove('border-red-400');
        errEl.classList.add('hidden');
      }
    }

    setError('name',    !name);
    setError('phone',   !phone);
    setError('message', !message);

    if (!valid) return;

    // Build the pre-filled WhatsApp message
    const dateStr  = eventDate
      ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Not specified';

    const text = [
      `Hi Kanya's Pleating! I'd like to book an appointment. 🙏`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Event Date:* ${dateStr}`,
      `*Details:* ${message}`,
      ``,
      `Looking forward to hearing from you!`,
    ].join('\n');

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waURL, '_blank', 'noopener,noreferrer');
  });

  // Live validation — clear errors as user types
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.value.trim()) {
        el.classList.remove('border-red-400');
        const errEl = el.nextElementSibling;
        if (errEl?.classList.contains('field-error')) {
          errEl.classList.add('hidden');
        }
      }
    });
  });
}

// ── Intersection Observer: fade-in on scroll ───────────────
const observerOptions = {
  root:       null,
  rootMargin: '0px 0px -60px 0px',
  threshold:  0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards and gallery images
document.querySelectorAll('.service-card, .gallery-img').forEach(el => {
  observer.observe(el);
});
