document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  const navScrim = document.getElementById('navScrim');

  function closeNav() {
    sidebar.classList.remove('is-open');
    navScrim.classList.remove('is-visible');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    sidebar.classList.add('is-open');
    navScrim.classList.add('is-visible');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  navToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });
  navScrim.addEventListener('click', closeNav);
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Active nav state on scroll ---------- */
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Scroll reveal for sections ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section').forEach(section => revealObserver.observe(section));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Project filtering ---------- */
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;

      projectCards.forEach(card => {
        const tech = card.dataset.tech;
        const show = filter === 'all' || tech === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Contact form (no backend — opens mail client) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('contactNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = 'Please fill in all fields with a valid email.';
      return;
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:ratul.hasan@example.com?subject=${subject}&body=${body}`;

    note.textContent = 'Opening your email app to send this message…';
  });

});
