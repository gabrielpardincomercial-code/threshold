/**
 * Felipe França - interações do site
 * Clean, lightweight vanilla JS replacing proprietary Framer hydration runtime
 */

document.addEventListener('DOMContentLoaded', () => {
  initWeekStrip();
  initWeekStripMobile();
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

// 1b. Week Strip no celular: abas + cartões deslizantes (scroll-snap)
function initWeekStripMobile() {
  const tz = document.querySelector('.tzw');
  if (!tz) return;
  const row = tz.querySelector('.tzw-row');
  const tabs = Array.from(tz.querySelectorAll('.tzw-tab'));
  const slats = Array.from(tz.querySelectorAll('.tzw-slat'));
  if (!row || !tabs.length || tabs.length !== slats.length) return;

  const isMobile = () => tz.getBoundingClientRect().width <= 760;
  let current = slats.findIndex((s) => s.getAttribute('data-open') === 'true');
  if (current < 0) current = Math.min(2, slats.length - 1);

  function offsetOf(i) {
    return slats[i].getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
  }

  function setActive(i, scroll, smooth) {
    current = i;
    slats.forEach((s, k) => {
      s.setAttribute('data-open', k === i ? 'true' : 'false');
      s.setAttribute('data-in', 'true');
      s.style.opacity = '1';
    });
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
      t.setAttribute('tabindex', k === i ? '0' : '-1');
    });
    tz.style.setProperty('--tzw-sel', String(i));
    if (scroll) row.scrollTo({ left: offsetOf(i), behavior: smooth ? 'smooth' : 'auto' });
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => { if (isMobile()) setActive(i, true, true); }));

  let ticking = false;
  row.addEventListener('scroll', () => {
    if (!isMobile() || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      let best = 0, bestDist = Infinity;
      slats.forEach((s, k) => {
        const d = Math.abs(offsetOf(k) - row.scrollLeft);
        if (d < bestDist) { bestDist = d; best = k; }
      });
      if (best !== current) setActive(best, false);
    });
  }, { passive: true });

  if (isMobile()) setActive(current, true, false);
  window.addEventListener('resize', () => { if (isMobile()) setActive(current, true, false); });
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

// 3. Mobile Navigation Menu (hambúrguer + painel com os links e o botão de aula grátis)
function initMobileNav() {
  const bar = document.querySelector('[data-framer-name="Bar"].framer-1xvbqlq') || document.querySelector('.framer-1xvbqlq');
  if (!bar || bar.querySelector('.ff-menu-btn')) return;
  const links = bar.querySelectorAll('[data-framer-name="Links"] a');
  const cta = bar.querySelector('[data-framer-name="Actions"] a');
  if (!links.length) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'ff-menu-btn';
  btn.setAttribute('aria-label', 'Abrir menu');
  btn.setAttribute('aria-expanded', 'false');

  const panel = document.createElement('nav');
  panel.className = 'ff-menu-panel';
  panel.setAttribute('aria-label', 'Menu principal');
  links.forEach((a) => {
    const item = document.createElement('a');
    item.href = a.getAttribute('href');
    item.textContent = a.textContent.trim();
    panel.appendChild(item);
  });
  if (cta) {
    const item = document.createElement('a');
    item.className = 'ff-menu-cta';
    item.href = cta.getAttribute('href');
    item.textContent = cta.textContent.trim();
    panel.appendChild(item);
  }

  function setOpen(open) {
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!panel.classList.contains('open')); });
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => { if (!bar.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('scroll', () => setOpen(false), { passive: true });

  bar.appendChild(btn);
  bar.appendChild(panel);
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
