/* ═══════════════════════════════════════════════════════════════
   Portfolio Application Logic
   Modern, performant JavaScript for dynamic interactions
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── State Management ──────────────────────────────────────────
  const state = {
    theme: localStorage.getItem('theme') || 'light',
    mobileMenuOpen: false,
    currentFilter: 'all'
  };

  // ─── Initialize App ────────────────────────────────────────────
  function init() {
    initTheme();
    initNavigation();
    initScrollAnimations();
    initScrollEffects();
    initScrollProgress();
    renderContent();
    setCurrentYear();

    // Performance optimization: Use passive listeners
    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
    window.addEventListener('resize', debounce(onResize, 250));

    // Trigger initial animations
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
      revealOnScroll();
    });
  }

  // ─── Theme Management ──────────────────────────────────────────
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeToggle();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    updateThemeToggle();

    // Add smooth transition effect
    document.documentElement.style.transition = 'none';
    requestAnimationFrame(() => {
      document.documentElement.style.transition = '';
    });
  }

  function updateThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = state.theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label',
        `Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`
      );
    }
  }

  // ─── Navigation ────────────────────────────────────────────────
  function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', state.mobileMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (state.mobileMenuOpen) {
            state.mobileMenuOpen = false;
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (state.mobileMenuOpen &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
          state.mobileMenuOpen = false;
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // ─── Scroll Effects ────────────────────────────────────────────
  function initScrollEffects() {
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    }

    updateNavbar();
    window.addEventListener('scroll', throttle(updateNavbar, 100), { passive: true });
  }

  function onScroll() {
    revealOnScroll();
    updateScrollProgress();
  }

  function onResize() {
    // Handle responsive adjustments
    if (window.innerWidth > 768 && state.mobileMenuOpen) {
      state.mobileMenuOpen = false;
      document.querySelector('.nav-links')?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ─── Scroll Reveal Animation ───────────────────────────────────
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      elements.forEach(el => el.classList.add('revealed'));
    }
  }

  function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal:not(.revealed)');

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add('revealed');
      }
    });
  }

  // ─── Content Rendering ─────────────────────────────────────────
  function renderContent() {
    renderSkillBadges();
    renderFeaturedProjects();
    renderAllProjects();
    initProjectFilters();
  }

  function renderSkillBadges() {
    const container = document.getElementById('skill-badges');
    if (!container || !window.portfolioData) return;

    const { skills } = window.portfolioData;
    const topSkills = skills.slice(0, 8);

    container.innerHTML = topSkills
      .map(skill => `<span class="skill-badge">${escapeHtml(skill)}</span>`)
      .join('');
  }

  function renderFeaturedProjects() {
    const container = document.getElementById('featured-projects');
    if (!container || !window.portfolioData) return;

    const { projects } = window.portfolioData;
    const featured = projects.filter(p => p.featured).slice(0, 3);

    container.innerHTML = featured
      .map((project, index) => createProjectCard(project, index))
      .join('');
  }

  function renderAllProjects() {
    const container = document.getElementById('all-projects');
    if (!container || !window.portfolioData) return;

    const { projects } = window.portfolioData;

    container.innerHTML = projects
      .map((project, index) => createProjectCard(project, index))
      .join('');
  }

  function createProjectCard(project, index) {
    const featuredBadge = project.featured
      ? '<span class="project-featured">Featured</span>'
      : '';

    const githubLink = project.github
      ? `<a href="${escapeHtml(project.github)}" class="project-link" target="_blank" rel="noopener">
          View Code →
         </a>`
      : '';

    const liveLink = project.live
      ? `<a href="${escapeHtml(project.live)}" class="project-link" target="_blank" rel="noopener">
          Live Demo →
         </a>`
      : '';

    return `
      <article class="project-card" data-tags="${escapeHtml(project.tags.join(','))}" style="animation-delay: ${index * 0.1}s">
        <div class="project-header">
          ${featuredBadge}
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-description">${escapeHtml(project.description)}</p>
        </div>
        <div class="project-tags">
          ${project.tags.map(tag =>
            `<span class="project-tag">${escapeHtml(tag)}</span>`
          ).join('')}
        </div>
        ${(githubLink || liveLink) ? `
          <div class="project-links">
            ${githubLink}
            ${liveLink}
          </div>
        ` : ''}
      </article>
    `;
  }

  // ─── Project Filters ───────────────────────────────────────────
  function initProjectFilters() {
    const filterBar = document.getElementById('filter-bar');
    if (!filterBar || !window.portfolioData) return;

    const { projects } = window.portfolioData;
    const allTags = new Set();

    projects.forEach(project => {
      project.tags.forEach(tag => allTags.add(tag));
    });

    // Add filter buttons
    const buttons = Array.from(allTags)
      .sort()
      .map(tag =>
        `<button class="filter-btn" data-filter="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
      )
      .join('');

    filterBar.innerHTML += buttons;

    // Add event listeners
    filterBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        filterProjects(filter);

        // Update active state
        filterBar.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    });
  }

  function filterProjects(filter) {
    const container = document.getElementById('all-projects');
    if (!container) return;

    const cards = container.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
      const tags = card.dataset.tags.split(',');
      const shouldShow = filter === 'all' || tags.includes(filter);

      if (shouldShow) {
        card.style.display = 'block';
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ─── Contact Form ──────────────────────────────────────────────
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous errors
      clearFormErrors();

      // Validate
      if (!validateForm(form)) {
        return;
      }

      const submitBtn = document.getElementById('submit-btn');
      const statusEl = document.getElementById('form-status');
      const originalText = submitBtn.textContent;

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';

        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          statusEl.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
          statusEl.style.color = '#10b981';
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        statusEl.textContent = '✗ Something went wrong. Please try again or email me directly.';
        statusEl.style.color = '#ef4444';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  function validateForm(form) {
    let isValid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
      showError('name', 'Please enter your name');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError('message', 'Please enter a message');
      isValid = false;
    }

    return isValid;
  }

  function showError(fieldId, message) {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const field = document.getElementById(fieldId);

    if (errorEl) errorEl.textContent = message;
    if (field) field.classList.add('error');
  }

  function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      el.classList.remove('error');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ─── Utility Functions ─────────────────────────────────────────
  function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // ─── Keyboard Navigation ───────────────────────────────────────
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // ESC to close mobile menu
      if (e.key === 'Escape' && state.mobileMenuOpen) {
        state.mobileMenuOpen = false;
        document.querySelector('.nav-links')?.classList.remove('active');
        document.querySelector('.hamburger')?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Scroll Progress Indicator ─────────────────────────────────
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollHeight) * 100;

    progressBar.style.transform = `scaleX(${progress / 100})`;
  }

  // ─── Performance Monitoring ────────────────────────────────────
  function logPerformance() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
        }, 0);
      });
    }
  }

  // ─── Initialize Everything ─────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      initContactForm();
      initKeyboardNav();
      logPerformance();
    });
  } else {
    init();
    initContactForm();
    initKeyboardNav();
    logPerformance();
  }

})();
