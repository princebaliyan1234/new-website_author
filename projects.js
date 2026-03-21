// ============================================================
//  SILENCE OF SCRIBES — projects.js
//  Add or remove entries here to update "Recent Projects"
//  on the homepage automatically. No HTML editing needed.
//
//  Each entry:
//    imgKey  → key from images.js  (e.g. 'lastSun')
//    alt     → image alt text
//    tag     → small label above title  (e.g. 'Cover Design — Illustrated')
//    title   → card heading
//    desc    → short description
//    link    → 'books.html' or 'covers.html' or external URL
//    linkText→ text on the arrow link  (e.g. 'Read More →')
// ============================================================

window.PROJECTS = [
    {
        imgKey:   'survivingCover',
        alt:      'Surviving in the Freezing Apocalypse with My Alpha',
        tag:      'Novel — WebNovel',
        title:    'Surviving in the Freezing Apocalypse with My Alpha',
        desc:     'A romance-fantasy survival story set in a world where a deadly frost storm turns people into the Frostborn.',
        link:     'books.html',
        linkText: 'Read More →',
    },
    {
        imgKey:   'lastSun',
        alt:      'The Last Sun Cover',
        tag:      'Cover Design — Illustrated',
        title:    'The Last Sun',
        desc:     'An epic illustrated cover featuring a silhouetted rider beneath a grand twilight sky and a ghostly figure above.',
        link:     'covers.html',
        linkText: 'View Gallery →',
    },
    {
        imgKey:   'vxv1',
        alt:      'Villainess x Villain',
        tag:      'Cover Design — WebNovel',
        title:    'Villainess x Villain',
        desc:     'A dark fantasy romance about two obsessed souls on opposing sides — beautifully dangerous and utterly captivating.',
        link:     'covers.html',
        linkText: 'View Gallery →',
    },
    {
        imgKey:   'endWorld1',
        alt:      'End World Tutorial',
        tag:      'Cover Design — LitRPG',
        title:    'End World Tutorial',
        desc:     'A level-1 adventurer faces an apocalyptic sea beast — quest UI overlays, HP bars, and raw chaos in three colour variants.',
        link:     'covers.html',
        linkText: 'View Gallery →',
    },
    {
        imgKey:   'daoReincarnation1',
        alt:      'The Dao of Reincarnation',
        tag:      'Cover Design — Cultivation',
        title:    'The Dao of Reincarnation',
        desc:     'Ink-wash aesthetics meet gold typography — a lone cultivator ascending through a hundred lives.',
        link:     'covers.html',
        linkText: 'View Gallery →',
    },
    {
        imgKey:   'cultivatingSeclusion1',
        alt:      'Cultivating in Seclusion for Ten Thousand Years',
        tag:      'Cover Design — Xianxia',
        title:    "Cultivating in Seclusion",
        desc:     'Serene mountain meditation, cherry blossoms, and two loyal chickens — warm xianxia slice-of-life energy.',
        link:     'covers.html',
        linkText: 'View Gallery →',
    },
];

// ── Render into #recentProjectsGrid ──────────────────────────
function renderProjects() {
    const grid = document.getElementById('recentProjectsGrid');
    if (!grid || !window.IMAGES) return;

    grid.innerHTML = window.PROJECTS.map(p => `
        <div class="work-card glass-card scroll-reveal">
            <div class="work-image">
                <img src="${window.IMAGES[p.imgKey] || ''}" alt="${p.alt}">
            </div>
            <div class="work-content">
                <span class="work-tag">${p.tag}</span>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <a href="${p.link}" class="work-link">${p.linkText}</a>
            </div>
        </div>
    `).join('');

    // Re-trigger scroll-reveal observer for newly created cards
    if (window._revealObserver) {
        grid.querySelectorAll('.scroll-reveal').forEach(el => {
            window._revealObserver.observe(el);
        });
    }
}

// Run after both images.js and the DOM are ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
