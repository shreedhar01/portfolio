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

    /* ----- Electricity sparks around the hero avatar ----- */
    (function electricitySparks() {
        var layer = document.getElementById('sparks');
        if (!layer) return;
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        var SVGNS = 'http://www.w3.org/2000/svg';
        var SIZE = 200, CX = 100, CY = 100;
        var R_INNER = 86;                 // start just outside the avatar
        var R_OUT_MIN = 110, R_OUT_MAX = 140; // bolt length range
        var MAX_LIVE = 7;

        function rnd(a, b) { return a + Math.random() * (b - a); }
        function pt(r, ang) { return [CX + r * Math.cos(ang), CY + r * Math.sin(ang)]; }

        function buildBolt() {
            if (layer.childElementCount >= MAX_LIVE) return;
            var ang = rnd(0, Math.PI * 2);
            var r1 = R_INNER + rnd(-3, 3);
            var r2 = rnd(R_OUT_MIN, R_OUT_MAX);
            var start = pt(r1, ang);
            var end = pt(r2, ang + rnd(-0.16, 0.16));

            // jagged intermediate points (perpendicular jitter)
            var segs = Math.max(3, Math.round(rnd(3, 6)));
            var dx = end[0] - start[0], dy = end[1] - start[1];
            var len = Math.hypot(dx, dy) || 1;
            var nx = -dy / len, ny = dx / len;
            var pts = [start];
            for (var i = 1; i < segs; i++) {
                var t = i / segs;
                var j = rnd(-9, 9) * (1 - Math.abs(t - 0.5) * 2 + 0.2);
                pts.push([start[0] + dx * t + nx * j, start[1] + dy * t + ny * j]);
            }
            pts.push(end);
            var poly = pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');

            var svg = document.createElementNS(SVGNS, 'svg');
            svg.setAttribute('viewBox', '0 0 ' + SIZE + ' ' + SIZE);
            svg.setAttribute('class', 'spark-bolt');
            svg.style.animationDuration = rnd(0.35, 0.6).toFixed(2) + 's';

            // outer glow stroke
            var outer = document.createElementNS(SVGNS, 'polyline');
            outer.setAttribute('points', poly);
            outer.setAttribute('fill', 'none');
            outer.setAttribute('stroke', 'var(--accent)');
            outer.setAttribute('stroke-width', '3');
            outer.setAttribute('stroke-linecap', 'round');
            outer.setAttribute('stroke-linejoin', 'round');
            outer.setAttribute('opacity', '0.55');
            // bright white core
            var core = document.createElementNS(SVGNS, 'polyline');
            core.setAttribute('points', poly);
            core.setAttribute('fill', 'none');
            core.setAttribute('stroke', '#ffffff');
            core.setAttribute('stroke-width', '1');
            core.setAttribute('stroke-linecap', 'round');
            core.setAttribute('stroke-linejoin', 'round');
            // endpoint spark dot
            var dot = document.createElementNS(SVGNS, 'circle');
            dot.setAttribute('cx', end[0].toFixed(1));
            dot.setAttribute('cy', end[1].toFixed(1));
            dot.setAttribute('r', rnd(1.2, 2.6).toFixed(1));
            dot.setAttribute('fill', '#ffffff');

            svg.appendChild(outer); svg.appendChild(core); svg.appendChild(dot);
            layer.appendChild(svg);
            setTimeout(function () { if (svg.parentNode) svg.parentNode.removeChild(svg); }, 720);
        }

        function loop() {
            buildBolt();
            if (Math.random() < 0.28) buildBolt(); // occasional fork/double
            setTimeout(loop, rnd(140, 360));
        }
        loop();
    })();

    console.log('Portfolio initialized.');
})();
