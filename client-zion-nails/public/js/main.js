/* =============================================================================
   AlamoSites Client Template - Base JavaScript
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ---------------------------------------------------------------------------
  // Mobile Navigation
  // ---------------------------------------------------------------------------
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('is-open') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Smooth Scroll for Anchor Links
  // ---------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
        
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Current Year for Copyright
  // ---------------------------------------------------------------------------
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // ---------------------------------------------------------------------------
  // Header Scroll Effect
  // ---------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // Reveal on Scroll
  // ---------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      revealItems.forEach(item => revealObserver.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('is-visible'));
    }
  }

  // ---------------------------------------------------------------------------
  // Form Validation Helper
  // ---------------------------------------------------------------------------
  const forms = document.querySelectorAll('[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Check required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      // Check email fields
      form.querySelectorAll('[type="email"]').forEach(field => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailRegex.test(field.value)) {
          isValid = false;
          field.classList.add('is-invalid');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Focus first invalid field
        form.querySelector('.is-invalid')?.focus();
      }
    });
    
    // Remove invalid state on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('is-invalid');
      });
    });
  });

});

/* =============================================================================
   AI-GENERATED SCRIPTS GO BELOW THIS LINE
   ============================================================================= */
