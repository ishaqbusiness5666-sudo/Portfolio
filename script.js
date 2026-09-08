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

const githubUsername = 'ishaqbusiness5666-sudo';
const githubApiBase = `https://api.github.com/users/${githubUsername}`;

async function fetchGitHubRest(path) {
    const response = await fetch(`${githubApiBase}${path}`, {
        headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) {
        throw new Error(`GitHub REST request failed with status ${response.status}.`);
    }
    return response.json();
}

async function loadGitHubActivity() {
    try {
        const [profile, events] = await Promise.all([
            fetchGitHubRest(''),
            fetchGitHubRest('/events/public?per_page=100')
        ]);
        document.getElementById('github-followers').textContent = profile.followers;
        document.getElementById('github-public-repos').textContent = profile.public_repos;
        document.getElementById('github-total-repos').textContent = profile.public_repos;
    } catch (error) {
        console.error(error);
    }
}

loadGitHubActivity();

const contributionsElement = document.getElementById('github-contribution-count');

const year = new Date().getFullYear();

fetch(`https://github-contributions-api.jogruber.de/v4/ishaqbusiness5666-sudo?y=${year}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch GitHub contributions");
        }
        return response.json();
    })
    .then(data => {
        const count = data.total[year] ?? 0;
        contributionsElement.textContent =
            `${count}`;
    })
    .catch(error => {
        console.error("GitHub contributions error:", error);
        contributionsElement.textContent =
            "Contributions unavailable";
    });