/* Shreedhar — Portfolio interactions */
(function () {
    'use strict';

    /* ----- Year ----- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ----- Theme toggle (persist) ----- */
    var root = document.documentElement;
    var themeToggle = document.getElementById('theme-toggle');
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) {}
    if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    /* ----- Mobile nav ----- */
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ----- Nav scroll state + scroll progress ----- */
    var nav = document.getElementById('nav');
    var progress = document.getElementById('scroll-progress');
    function onScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        if (nav) nav.classList.toggle('scrolled', y > 8);
        if (progress) {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ----- Active link via IntersectionObserver ----- */
    var sections = document.querySelectorAll('section[id]');
    var linkMap = {};
    document.querySelectorAll('.nav-link').forEach(function (l) {
        linkMap[l.getAttribute('href').slice(1)] = l;
    });
    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id;
                    Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('active'); });
                    if (linkMap[id]) linkMap[id].classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(function (s) { spy.observe(s); });
    }

    /* ----- Reveal on scroll ----- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        var revObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
        reveals.forEach(function (r) { revObs.observe(r); });
    } else {
        reveals.forEach(function (r) { r.classList.add('in'); });
    }

    /* ----- Live GitHub repo count ----- */
    async function fetchGitHubData(username) {
        var el = document.getElementById('repo-count');
        if (!el) return;
        try {
            var res = await fetch('https://api.github.com/users/' + username);
            if (!res.ok) throw new Error('GitHub request failed');
            var data = await res.json();
            if (typeof data.public_repos === 'number') el.textContent = data.public_repos;
        } catch (e) {
            el.textContent = '∞';
        }
    }
    fetchGitHubData('shreedhar01');

    console.log('Portfolio initialized.');
})();
