// script.js
// Handles navigation toggle, active links, reveal animations,
// footer year update, and contact form (static-site friendly)

(function () {

  /* =========================
     Mobile Navigation Toggle
     ========================= */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a nav link (mobile)
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================
     Footer Year (Auto Update)
     ========================= */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     Active Navigation Link
     ========================= */
  const navLinks = document.querySelectorAll("#nav a");
  navLinks.forEach(link => {
    try {
      const linkPath = new URL(link.href).pathname;
      const currentPath = window.location.pathname;

      if (
        linkPath === currentPath ||
        linkPath === currentPath.replace(/^\/+/, "")
      ) {
        link.classList.add("active");
      }
    } catch (err) {
      // Ignore invalid URLs
    }
  });

  /* =========================
     Reveal Animation on Scroll
     ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("visible"));
  }

  /* =========================
     Close Mobile Nav on ESC
     ========================= */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  /* =========================
     Contact Form (Static Safe)
     ========================= */
  const contactForm = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-msg");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        if (formMsg) formMsg.textContent = "Please fill in all fields.";
        return;
      }

      // Static site message (no backend)
      if (formMsg) {
        formMsg.textContent =
          "Thanks for your message! Please email me directly at haiderhadi5474@gmail.com.";
      }

      contactForm.reset();
    });
  }

})();
