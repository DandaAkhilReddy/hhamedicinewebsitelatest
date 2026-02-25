(function () {
  'use strict';

  // ---- Mobile Navigation Toggle ----
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var body = document.body;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        // Trap focus: focus first nav link
        var firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
      }
    });

    // Close nav on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Close nav when clicking a nav link
    var navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (body.classList.contains('nav-open')) {
          body.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---- Sticky Header ----
  var header = document.getElementById('site-header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll Animations (Intersection Observer) ----
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var animatedElements = document.querySelectorAll(
      '.about .text-content, .about .image-content, ' +
      '.value-card, ' +
      '.join .text-content, .join .image-content'
    );

    animatedElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Application Form ----
  var showFormBtn = document.getElementById('show-form-btn');
  var applicationForm = document.getElementById('application-form');
  var thankYouMessage = document.getElementById('thank-you-message');

  if (showFormBtn && applicationForm) {
    showFormBtn.addEventListener('click', function () {
      showFormBtn.style.display = 'none';
      applicationForm.style.display = 'block';
    });

    applicationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('applicant-name');
      var emailInput = document.getElementById('applicant-email');
      var valid = true;

      [nameInput, emailInput].forEach(function (input) {
        input.classList.remove('invalid');
      });

      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        valid = false;
      }

      if (!emailInput.value.trim() || emailInput.value.indexOf('@') === -1) {
        emailInput.classList.add('invalid');
        valid = false;
      }

      if (!valid) return;

      applicationForm.style.display = 'none';
      if (thankYouMessage) {
        thankYouMessage.style.display = 'block';
      }
    });
  }
})();
