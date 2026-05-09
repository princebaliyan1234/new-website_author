// ============================================================
//  SILENCE OF SCRIBES — projects.js
//  Edit PROJECTS below to update "Recent Projects" on the
//  homepage. ALL entries are shown. Most recent goes first.
//
//  Link format for covers:  'covers.html#tab~coverKey'
//  e.g. 'covers.html#webnovel~demonicStreamer2'
//       'covers.html#fantasy~firefliesOfDawn1'
//       'covers.html#handdrawn~battleGearTournament1'
//       'covers.html#illustrated~lastSun'
//  Link format for books:   'books.html'
// ============================================================

window.PROJECTS = [

    // ── ADD NEW ITEMS AT THE TOP ─────────────────────────────

    {
        imgKey:   'battleGearTournament1',
        tag:      'Cover Design — Hand-Drawn',
        title:    'Battle Gear Tournament',
        desc:     'Fully hand-drawn anime sci-fi cover — sword master MC, neon-lit futuristic cityscape, zero AI tools.',
        link:     'covers.html#handdrawn~battleGearTournament1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'firefliesOfDawn1',
        tag:      'Cover Design — Fantasy',
        title:    'Fireflies of Dawn',
        desc:     'Ember-lit butterfly, ghostly clock face, cherry blossoms — timeless and achingly romantic.',
        link:     'covers.html#fantasy~firefliesOfDawn1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'curseOfGoldenSoul1',
        tag:      'Cover Design — Fantasy',
        title:    'Curse of Golden Soul',
        desc:     'Gilded ring, decaying rose, fractured stone — beauty and ruin in perfect tension.',
        link:     'covers.html#fantasy~curseOfGoldenSoul1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'limitBreaker1',
        tag:      'Cover Design — Action',
        title:    'Limit Breaker: Reborn as a Hunter',
        desc:     'White-haired hunter gripping an ice-blue sword on a skull-strewn battlefield — raw and intense.',
        link:     'covers.html#webnovel~limitBreaker1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'demonicStreamer2',
        tag:      'Cover Design — System',
        title:    'Demonic Streamer System',
        desc:     'Half human, half demon — a duality portrait split between two worlds and two versions.',
        link:     'covers.html#webnovel~demonicStreamer2',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'angelOfDarkness1',
        tag:      'Cover Design — Dark Fantasy',
        title:    'Angel of Darkness',
        desc:     'Fallen angel in obsidian armour before a blood-red moon — wings of shadow, sword in hand.',
        link:     'covers.html#webnovel~angelOfDarkness1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'levelUpSleep1',
        tag:      'Cover Design — LitRPG',
        title:    'Level Up While I Sleep',
        desc:     'Pyjama-wearing protagonist radiating explosive dual fire-and-lightning power — three versions.',
        link:     'covers.html#webnovel~levelUpSleep1',
        linkText: 'View Cover →',
    },
    {
        imgKey:   'survivingCover',
        tag:      'Novel — WebNovel',
        title:    'Surviving in the Freezing Apocalypse with My Alpha',
        desc:     'A romance-fantasy survival story — deadly frost storm, Frostborn creatures, and a love that burns through the ice.',
        link:     'books.html',
        linkText: 'Read More →',
    },

];

// ── Renderer ─────────────────────────────────────────────────
function renderProjects() {
    const grid = document.getElementById('recentProjectsGrid');
    if (!grid || !window.IMAGES) return;

    grid.innerHTML = window.PROJECTS.map(p => `
        <div class="work-card glass-card scroll-reveal">
            <div class="work-image" style="height:auto;">
                <img src="${window.IMAGES[p.imgKey] || ''}" alt="${p.title}" loading="lazy"
                     style="width:100%;height:auto;aspect-ratio:2/3;object-fit:cover;display:block;transition:transform 0.5s ease;">
            </div>
            <div class="work-content">
                <span class="work-tag">${p.tag}</span>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <a href="${p.link}" class="work-link">${p.linkText}</a>
            </div>
        </div>
    `).join('');

    if (window._revealObserver) {
        grid.querySelectorAll('.scroll-reveal').forEach(el => {
            window._revealObserver.observe(el);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
