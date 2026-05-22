/**
 * CEIP Carmen Martín Gaite - Performance Animation Engine (ES Module)
 * Exporta `initAnimations()` para integrarlo desde `main.js`.
 */

export function initAnimations({ threshold = 0.15, rootMargin = "0px 0px -50px 0px", once = true } = {}) {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        // Mostrar todo sin animaciones si el usuario lo prefiere
        document.querySelectorAll('.reveal, .title-reveal, .news-card').forEach(el => el.classList.add('active'));
        return;
    }

    const opts = { threshold, rootMargin };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (once) obs.unobserve(entry.target);
            }
        });
    }, opts);

    const animatedElements = document.querySelectorAll('.reveal, .title-reveal, .news-card');
    animatedElements.forEach(el => observer.observe(el));
}

export default initAnimations;