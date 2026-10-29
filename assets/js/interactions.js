/**
 * Felipe França - interações do site
 * Clean, lightweight vanilla JS replacing proprietary Framer hydration runtime
 */

document.addEventListener('DOMContentLoaded', () => {
  initWeekStrip();
  initFAQAccordions();
  initMobileNav();
  initForms();
});

// 1. Week Strip Timetable (Mon-Sun)
function initWeekStrip() {
  const slats = Array.from(document.querySelectorAll('.tzw-slat'));
  if (!slats.length) return;

  function setActiveSlat(index) {
    slats.forEach((s, i) => {
      if (i === index) {
        s.setAttribute('data-open', 'true');
        s.setAttribute('data-in', 'true');
      } else {
        s.setAttribute('data-open', 'false');
        if (s.getAttribute('data-rest') !== 'true') {
          s.setAttribute('data-in', 'true');
        } else {
          s.setAttribute('data-in', 'false');
        }
      }
    });
  }

  slats.forEach((slat, index) => {
    slat.style.cursor = 'pointer';
    slat.addEventListener('click', (e) => {
      // Don't trigger if clicking book button inside active slat
      if (e.target.closest('.tzw-btn') || e.target.closest('a')) return;
      setActiveSlat(index);
    });
  });

  // Prev / Next arrow buttons
  const navBtns = document.querySelectorAll('.tzw-nav button, .tzw-actions button, [data-framer-name="Actions"] div');
  if (navBtns.length >= 2) {
    const prevBtn = navBtns[0];
    const nextBtn = navBtns[1];

    prevBtn.style.cursor = 'pointer';
    nextBtn.style.cursor = 'pointer';

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let curIdx = slats.findIndex(s => s.getAttribute('data-open') === 'true');
      if (curIdx === -1) curIdx = 2;
      const nextIdx = (curIdx - 1 + slats.length) % slats.length;
      setActiveSlat(nextIdx);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let curIdx = slats.findIndex(s => s.getAttribute('data-open') === 'true');
      if (curIdx === -1) curIdx = 2;
      const nextIdx = (curIdx + 1) % slats.length;
      setActiveSlat(nextIdx);
    });
  }
}

// 2. FAQ Accordions
function initFAQAccordions() {
  const qSection = document.querySelector('[data-framer-name="Questions"]');
  if (!qSection) return;

  const items = qSection.querySelectorAll('[data-framer-name="Closed"], .framer-1yywqst');
  items.forEach(item => {
    const row = item.querySelector('[data-framer-name="Row"]');
    const answer = item.querySelector('[data-framer-name="Answer"]');
    const toggle = item.querySelector('[data-framer-name="Toggle"] svg, [data-framer-name="Toggle"]');

    if (row && answer) {
      answer.classList.add('faq-answer-collapsed');
      row.style.cursor = 'pointer';

      row.addEventListener('click', () => {
        const isOpen = answer.classList.contains('faq-answer-expanded');
        if (isOpen) {
          answer.classList.remove('faq-answer-expanded');
          answer.classList.add('faq-answer-collapsed');
          if (toggle) toggle.classList.remove('faq-toggle-rotated');
        } else {
          answer.classList.remove('faq-answer-collapsed');
          answer.classList.add('faq-answer-expanded');
          if (toggle) toggle.classList.add('faq-toggle-rotated');
        }
      });
    }
  });
}

// 3. Mobile Navigation Menu
function initMobileNav() {
  const menuBtn = document.querySelector('[data-framer-name="Menu button"]');
  const navLayer = document.querySelector('[data-framer-name="Navigation layer"]');
  if (menuBtn && navLayer) {
    menuBtn.style.cursor = 'pointer';
    menuBtn.addEventListener('click', () => {
      const isVisible = navLayer.style.display === 'flex' || navLayer.style.display === 'block';
      navLayer.style.display = isVisible ? 'none' : 'flex';
    });
  }
}

// 4. Booking and Contact Forms
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]') || form.querySelector('button');
      const origText = submitBtn ? submitBtn.innerText : '';
      if (submitBtn) {
        submitBtn.innerText = 'Reservado!';
        submitBtn.style.backgroundColor = '#22c55e';
      }
      setTimeout(() => {
        alert('Obrigado! Sua vaga está reservada. Enviaremos os detalhes por e-mail.');
        if (submitBtn) {
          submitBtn.innerText = origText;
          submitBtn.style.backgroundColor = '';
        }
        form.reset();
      }, 400);
    });
  });
}
