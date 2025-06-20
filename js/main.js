// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Fade-in sections
const fadeSections = document.querySelectorAll('.section-fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeSections.forEach(sec => fadeObserver.observe(sec));

// Highlight nav link (scrollspy)
const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${id}"], #mobile-menu a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });
sections.forEach(sec => navObserver.observe(sec));

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Initialize Typed.js
new Typed('#typed', {
  strings: ['Kỹ sư Tự động hóa', 'Developer', 'Problem Solver'],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});


// … (đoạn code cũ) …

// 6. Theme switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Lần đầu load: lấy giá trị từ localStorage hoặc theo OS preference
let theme = localStorage.getItem('theme');
if (!theme) {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
setTheme(theme);

themeToggleBtn.addEventListener('click', () => {
  theme = (theme === 'dark' ? 'light' : 'dark');
  setTheme(theme);
  localStorage.setItem('theme', theme);
});

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}


// --- Tabs cho Experience ---
const tabs = document.querySelectorAll('#companyList li');
const panels = document.querySelectorAll('.company-details');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 1. Bỏ active khỏi tất cả tabs, hide hết panels
    tabs.forEach(t => t.classList.remove('bg-blue-600','text-white'));
    panels.forEach(p => p.classList.add('hidden'));
    // 2. Active tab được click
    tab.classList.add('bg-blue-600','text-white');
    // 3. Show panel tương ứng
    const panel = document.getElementById(tab.dataset.company);
    if (panel) panel.classList.remove('hidden');
  });
});

// 4. Mặc định kích hoạt tab đầu
if (tabs.length > 0) {
  tabs[0].click();
}
