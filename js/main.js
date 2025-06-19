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

// Intersection Observer cho fade-in
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

// Intersection Observer cho highlight nav
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
}, {
    rootMargin: '-50% 0px -50% 0px'
});
sections.forEach(sec => navObserver.observe(sec));
