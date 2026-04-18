/* LUMINARA GEMS — main.js v3 */
document.addEventListener('DOMContentLoaded', () => {

  /* PAGE LOADER */
  const loader = document.getElementById('page-loader');
  if (loader) {
    const hide = () => loader.classList.add('hidden');
    if (document.readyState === 'complete') setTimeout(hide, 300);
    else { window.addEventListener('load', () => setTimeout(hide, 400)); setTimeout(hide, 2800); }
  }

  /* FADE IN */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));

  /* NAV SCROLL */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const upd = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', upd, { passive: true });
    upd();
  }

  /* ACTIVE LINK */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if ((a.getAttribute('href') || '') === page) a.classList.add('active');
  });

  /* BURGER */
  const burger = document.getElementById('navBurger');
  const mob = document.getElementById('mobileMenu');
  if (burger && mob) {
    const tog = (f) => {
      const o = f !== undefined ? f : !mob.classList.contains('open');
      burger.classList.toggle('open', o);
      mob.classList.toggle('open', o);
      document.body.style.overflow = o ? 'hidden' : '';
    };
    burger.addEventListener('click', () => tog());
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => tog(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') tog(false); });
  }

  /* REVEAL */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

  /* SLIDESHOW */
  const slides = document.querySelectorAll('.hero-section .slide');
  const dots   = document.querySelectorAll('.dot');
  if (slides.length) {
    let cur = 0, tmr;
    const go = n => {
      slides[cur].classList.remove('active');
      if (dots[cur]) dots[cur].classList.remove('active');
      cur = ((n % slides.length) + slides.length) % slides.length;
      slides[cur].classList.add('active');
      if (dots[cur]) dots[cur].classList.add('active');
    };
    const start = () => { clearInterval(tmr); tmr = setInterval(() => go(cur + 1), 5500); };
    slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); start(); }));
    start();
  }

  /* LANGUAGE */
  const LANG = {
    en:{ h:'Home',v:'The Vault',s:'Gem Safaris',j:'Journal',sc:'Sanaa Chains',a:'About',g:'Gallery',c:'Contact' },
    fr:{ h:'Accueil',v:'Le Coffre',s:'Safaris Gemmes',j:'Journal',sc:'Sanaa Chains',a:'À Propos',g:'Galerie',c:'Contact' },
    de:{ h:'Startseite',v:'Der Tresor',s:'Gem-Safaris',j:'Journal',sc:'Sanaa Chains',a:'Über uns',g:'Galerie',c:'Kontakt' },
    ru:{ h:'Главная',v:'Хранилище',s:'Гем-Сафари',j:'Журнал',sc:'Sanaa Chains',a:'О нас',g:'Галерея',c:'Контакт' },
    tr:{ h:'Anasayfa',v:'Hazine',s:'Gem Safarileri',j:'Dergi',sc:'Sanaa Chains',a:'Hakkında',g:'Galeri',c:'İletişim' },
  };
  document.querySelectorAll('.lang-dropdown a[data-lang]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = LANG[a.dataset.lang]; if (!t) return;
      const code = document.querySelector('.lang-code'); if (code) code.textContent = a.dataset.lang.toUpperCase();
      document.querySelectorAll('[data-nk]').forEach(el => { if (t[el.dataset.nk]) el.textContent = t[el.dataset.nk]; });
      document.documentElement.lang = a.dataset.lang;
    });
  });

  /* CONTACT FORM */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const name = (form.querySelector('[name=first_name]')?.value||'') + ' ' + (form.querySelector('[name=last_name]')?.value||'');
      const inquiry = form.querySelector('[name=inquiry_type]')?.value || '';
      const msg = form.querySelector('[name=message]')?.value || '';
      const wa = 'https://wa.me/255757247973?text=' + encodeURIComponent(`Hello Jonathan, I'm ${name.trim()}.\nInquiry: ${inquiry}\n${msg}`);
      btn.textContent = 'Sending…'; btn.disabled = true; btn.style.background = 'var(--gold-dim)';
      setTimeout(() => {
        btn.textContent = '✓ Submitted — Jonathan replies within 24 hrs';
        btn.style.background = '#2d6a4f'; btn.style.color = '#fff';
        window.open(wa, '_blank');
      }, 1200);
    });
  }

  /* PAGE TRANSITIONS */
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || a.target === '_blank') return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 230);
    });
  });

  /* STAGGER */
  document.querySelectorAll('.stagger > *').forEach((el, i) => { el.style.transitionDelay = (i * 0.08) + 's'; });

});
