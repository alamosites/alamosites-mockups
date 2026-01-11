/* =============================================================================
   Youth Beyond Resilience - Main JavaScript
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  // Sticky header on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const navToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (event) {
      if (!navMenu.classList.contains('is-open')) {
        return;
      }

      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Email form submission
  const emailForm = document.querySelector('.email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailField = this.querySelector('input[type="email"]');
      const email = emailField ? emailField.value : '';

      if (email) {
        alert('Thank you for subscribing. We will send updates to: ' + email);
      }

      this.reset();
    });
  }

  // Animate stats on scroll into view
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
      };

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      stats.forEach(function (stat) {
        observer.observe(stat);
      });
    } else {
      stats.forEach(function (stat) {
        animateValue(stat);
      });
    }
  }

  function animateValue(element) {
    const text = element.textContent.trim();
    const hasK = text.toLowerCase().includes('k');
    const hasM = text.toLowerCase().includes('m');
    const numeric = parseFloat(text.replace(/[^0-9.]/g, ''));

    if (Number.isNaN(numeric)) {
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = numeric / (duration / 16);

    const timer = setInterval(function () {
      start += increment;
      if (start >= numeric) {
        start = numeric;
        clearInterval(timer);
      }

      let displayValue = Math.floor(start);
      if (hasM) {
        displayValue = '$' + displayValue + 'M';
      } else if (hasK) {
        displayValue = displayValue + 'k';
      }

      element.textContent = displayValue;
    }, 16);
  }
});

