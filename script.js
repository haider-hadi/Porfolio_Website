// Client-side script for navigation, reveal animations, and small helpers
(function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // close nav when clicking a link
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mark active nav link
  const links = document.querySelectorAll('#nav a');
  links.forEach((a) => {
    try {
      const url = new URL(a.href);
      if (url.pathname === location.pathname || url.pathname === location.pathname.replace(/^\/+/, '')) {
        a.classList.add('active');
      }
    } catch (e) {}
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((r) => io.observe(r));
  } else {
    // fallback
    reveals.forEach((r) => r.classList.add('visible'));
  }

  // Close mobile nav on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Contact form submission (graceful if no backend configured)
  const contactForm = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value?.trim();
      const email = document.getElementById('email')?.value?.trim();
      const message = document.getElementById('message')?.value?.trim();

      if (!name || !email || !message) {
        if (formMsg) formMsg.textContent = 'Please complete all fields.';
        return;
      }

      if (formMsg) {
        formMsg.textContent = 'Sending…';
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (res.ok) {
          if (formMsg) formMsg.textContent = 'Message sent — thank you!';
          contactForm.reset();
        } else {
          throw new Error('server');
        }
      } catch (err) {
        if (formMsg) formMsg.textContent = 'Unable to send from this static site. Please email haiderhadi5474@gmail.com';
      }
    });
  }
})();