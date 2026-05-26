/**

 * Portfolio — interactions, robot scene, particles, parallax

 */



(function () {

  'use strict';



  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  // --- Mobile menu ---

  const mobileMenuButton = document.getElementById('mobile-menu-button');

  const mobileMenu = document.getElementById('mobile-menu');



  if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener('click', () => {

      const isOpen = !mobileMenu.classList.contains('hidden');

      mobileMenu.classList.toggle('hidden');

      mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));

    });



    document.querySelectorAll('#mobile-menu a').forEach((link) => {

      link.addEventListener('click', () => {

        mobileMenu.classList.add('hidden');

        mobileMenuButton.setAttribute('aria-expanded', 'false');

      });

    });



    document.addEventListener('click', (e) => {

      if (

        !mobileMenu.classList.contains('hidden') &&

        !mobileMenu.contains(e.target) &&

        !mobileMenuButton.contains(e.target)

      ) {

        mobileMenu.classList.add('hidden');

        mobileMenuButton.setAttribute('aria-expanded', 'false');

      }

    });

  }



  // --- Header scroll ---

  const header = document.querySelector('.site-header');

  if (header) {

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);

    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

  }



  // --- Scrollspy ---

  const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');

  const sections = document.querySelectorAll('main section[id]');



  if (sections.length && navLinks.length) {

    const setActiveNav = (id) => {

      navLinks.forEach((a) => {

        const href = a.getAttribute('href');

        if (!href || !href.startsWith('#')) return;

        a.classList.toggle('active', href.slice(1) === id);

      });

    };



    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) setActiveNav(entry.target.id);

        });

      },

      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }

    );



    sections.forEach((sec) => observer.observe(sec));

    setActiveNav('hero');

  }



  // --- AOS ---

  if (typeof AOS !== 'undefined') {

    AOS.init({

      duration: 800,

      easing: 'ease-out-cubic',

      once: true,

      offset: 80,

      disable: prefersReducedMotion

    });

  }



  // --- Typed.js ---

  const typedEl = document.getElementById('typed');

  if (typedEl && typeof Typed !== 'undefined' && !prefersReducedMotion) {

    new Typed('#typed', {

      strings: [

        'Industrial Automation · PLC · SCADA',

        'Lean Manufacturing · Smart Factory',

        'C# · WinForms · Industrial Software'

      ],

      typeSpeed: 50,

      backSpeed: 32,

      backDelay: 2000,

      loop: true,

      showCursor: true,

      cursorChar: '|'

    });

  } else if (typedEl) {

    typedEl.textContent = 'Industrial Automation · PLC · SCADA';

  }



  // --- Theme ---

  const themeToggleBtn = document.getElementById('theme-toggle');

  const themeIcon = document.getElementById('theme-icon');



  function applyTheme(theme) {

    const isLight = theme === 'light';

    document.documentElement.classList.toggle('light', isLight);

    document.documentElement.classList.toggle('dark', !isLight);

    if (themeIcon) {

      themeIcon.classList.remove('fa-moon', 'fa-sun');

      themeIcon.classList.add(isLight ? 'fa-moon' : 'fa-sun');

    }

    if (themeToggleBtn) {

      themeToggleBtn.setAttribute('aria-label', isLight ? 'Bật chế độ tối' : 'Bật chế độ sáng');

    }

  }



  let theme = localStorage.getItem('theme');

  if (!theme) {

    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  }

  applyTheme(theme);



  if (themeToggleBtn) {

    themeToggleBtn.addEventListener('click', () => {

      theme = theme === 'dark' ? 'light' : 'dark';

      applyTheme(theme);

      localStorage.setItem('theme', theme);

    });

  }



  // --- Cursor glow + hero robot background parallax ---
  const cursorGlow = document.getElementById('cursor-glow');
  const robotScene = document.getElementById('robot-scene');
  const heroRobotBg = document.getElementById('hero-robot-bg');
  const heroRobotLottie = heroRobotBg?.querySelector('.hero-robot-bg__lottie');

  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-cursor-glow');

    let mouseX = 0;
    let mouseY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorGlow) {
        cursorGlow.style.left = `${mouseX}px`;
        cursorGlow.style.top = `${mouseY}px`;
      }
    });

    if (heroRobotLottie) {
      const mouseParallax = () => {
        parallaxX += ((mouseX / window.innerWidth - 0.5) * 24 - parallaxX) * 0.06;
        parallaxY += ((mouseY / window.innerHeight - 0.5) * 16 - parallaxY) * 0.06;
        const base = window.innerWidth < 992
          ? 'translate(0, 5%) scale(1.1)'
          : 'translate(8%, -2%) scale(1.05)';
        heroRobotLottie.style.transform = `${base} translate(${parallaxX}px, ${parallaxY}px)`;
        requestAnimationFrame(mouseParallax);
      };
      requestAnimationFrame(mouseParallax);
    }
  }



  // --- Particle canvas ---

  const canvas = document.getElementById('particles-canvas');

  if (canvas && !prefersReducedMotion) {

    const ctx = canvas.getContext('2d');

    let particles = [];

    let w = 0;

    let h = 0;

    let animId = null;



    function resize() {

      const parent = canvas.parentElement;

      if (!parent) return;

      w = parent.offsetWidth;

      h = parent.offsetHeight;

      canvas.width = w;

      canvas.height = h;

      const count = Math.min(80, Math.floor((w * h) / 12000));

      particles = Array.from({ length: count }, () => ({

        x: Math.random() * w,

        y: Math.random() * h,

        vx: (Math.random() - 0.5) * 0.35,

        vy: (Math.random() - 0.5) * 0.35,

        r: Math.random() * 1.5 + 0.5,

        a: Math.random() * 0.5 + 0.2

      }));

    }



    function draw() {

      ctx.clearRect(0, 0, w, h);

      const accent = '34, 211, 238';



      particles.forEach((p, i) => {

        p.x += p.vx;

        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;

        if (p.y < 0 || p.y > h) p.vy *= -1;



        ctx.beginPath();

        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${accent}, ${p.a})`;

        ctx.fill();



        for (let j = i + 1; j < particles.length; j++) {

          const q = particles[j];

          const dx = p.x - q.x;

          const dy = p.y - q.y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {

            ctx.beginPath();

            ctx.moveTo(p.x, p.y);

            ctx.lineTo(q.x, q.y);

            ctx.strokeStyle = `rgba(${accent}, ${0.08 * (1 - dist / 100)})`;

            ctx.stroke();

          }

        }

      });



      animId = requestAnimationFrame(draw);

    }



    resize();

    draw();

    window.addEventListener('resize', resize);



    document.addEventListener('visibilitychange', () => {

      if (document.hidden && animId) {

        cancelAnimationFrame(animId);

        animId = null;

      } else if (!animId) {

        draw();

      }

    });

  }



  // --- Stat counters ---

  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length && !prefersReducedMotion) {

    const countObserver = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const el = entry.target;

          const target = parseInt(el.getAttribute('data-count'), 10);

          const duration = 1600;

          const start = performance.now();



          function tick(now) {

            const progress = Math.min((now - start) / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);

            el.textContent = Math.floor(eased * target);

            if (progress < 1) requestAnimationFrame(tick);

            else countObserver.unobserve(el);

          }



          requestAnimationFrame(tick);

        });

      },

      { threshold: 0.4 }

    );



    statNumbers.forEach((el) => countObserver.observe(el));

  } else {

    statNumbers.forEach((el) => {

      el.textContent = el.getAttribute('data-count');

    });

  }



  // --- Subtle scroll parallax (hero background) ---
  if (!prefersReducedMotion && heroRobotBg) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroRobotBg.style.transform = `translateY(${y * 0.18}px)`;
        }
      },
      { passive: true }
    );
  }

})();


