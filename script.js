document.addEventListener('DOMContentLoaded', () => {
    if (!window.gsap) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    gsap.from('.hero-copy > *', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
    });

    gsap.from('.terminal', {
        opacity: 0,
        x: 28,
        duration: 0.9,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.utils.toArray('section:not(.hero)').forEach((section) => {
        gsap.from(section.querySelectorAll('.section-head, .about-grid, .projects, .stats-grid, .focus-bars, .contact-box'), {
            scrollTrigger: { trigger: section, start: 'top 82%', once: true },
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.focus-fill').forEach((bar) => {
        gsap.fromTo(bar, { width: 0 }, {
            width: bar.style.width,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true }
        });
    });
});
