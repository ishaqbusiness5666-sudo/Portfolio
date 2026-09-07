document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loader = document.getElementById('page-loader');
    const cursor = document.getElementById('cursor');

    if (cursor && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', ({ clientX, clientY }) => {
            cursor.style.left = `${clientX}px`;
            cursor.style.top = `${clientY}px`;
        }, { passive: true });
    }

    if (!window.gsap) {
        loader?.remove();
        return;
    }

    if (reduceMotion) {
        loader?.remove();
        return;
    }

    const intro = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => loader?.setAttribute('aria-hidden', 'true')
    });

    intro.to('.loader-line span', { scaleX: 1, duration: 0.45, ease: 'power3.inOut' })
        .to(loader, { yPercent: -100, duration: 0.65, ease: 'power3.inOut' })
        .from('.hero-copy > *', { opacity: 0, y: 24, duration: 0.55, stagger: 0.06 }, '-=0.2')
        .from('.terminal', { opacity: 0, x: 28, duration: 0.7 }, '<');

});
