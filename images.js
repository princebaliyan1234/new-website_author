// ============================================================
//  SILENCE OF SCRIBES — images.js
//  All paths match your actual files in the /images/ folder.
//  If you rename a file, just update the path here — done.
// ============================================================
window.IMAGES = {
    logo:           'images/sos-logo.png',
    authorAvatar:   'images/peng.webp',
    survivingCover: 'images/1739386302852.jpeg',
    vxv1:           'images/villainess-x-villain-1.png',
    vxv2:           'images/villainess-x-villain-2.png',
    vxv3:           'images/villainess-x-villain-3.png',
    redVoid1:       'images/red-void-ascension-1.png',
    redVoid2:       'images/red-void-ascension.png',
    queenShadows1:  'images/Queen-of-Broken-Shadows.jpg',
    queenShadows2:  'images/queen-of-broken-shadows-2.jpg',
    poisonedIce1:   'images/Poisoned-Ice-Obsession.png',
    poisonedIce2:   'images/poisoned-ice-obsession-2.jpg',
    lastSun:        'images/visual-hirearchy-last-sun.png',
    nightwatcher:   'images/The-nightwatcher.jpg',
    ashCityOps:     'images/aco.png',
    callerBeasts:   'images/caller-of-the-beasts-5.png',
    processbanner:  'images/webnovel-gig-thumbnail.jpg',
    // End World Tutorial [LitRPG]
    endWorld1:      'images/end-world-tutorial-1.png',
    endWorld2:      'images/end-world-tutorial-2.png',
    endWorld3:      'images/end-world-tutorial-3.png',
    // The Dao of Reincarnation
    daoReincarnation1: 'images/dao-of-reincarnation-1.png',
    daoReincarnation2: 'images/dao-of-reincarnation-2.png',
    daoReincarnation3: 'images/dao-of-reincarnation-3.png',
    // Cultivating in Seclusion
    cultivatingSeclusion1: 'images/cultivating-in-seclusion.png',
    // God's Blessing
    godsBlessing1:  'images/gods-blessing-1.png',
    godsBlessing2:  'images/gods-blessing-2.png',
    godsBlessing3:  'images/gods-blessing-3.png',
    // ── NEW COVERS ──────────────────────────────────────────
    // Angel of Darkness
    angelOfDarkness1: 'images/angel-of-darkness.png',
    // Level Up While I Sleep (v3 = main)
    levelUpSleep1:  'images/level-up-while-i-sleep-1.png',
    levelUpSleep2:  'images/level-up-while-i-sleep-2.png',
    levelUpSleep3:  'images/level-up-while-i-sleep-3.png',
    // Limit Breaker
    limitBreaker1:  'images/limit-breaker.png',
    // Demonic Streamer System (v2 = main)
    demonicStreamer1: 'images/demonic-streamer-system-1.png',
    demonicStreamer2: 'images/demonic-streamer-system-2.png',
    // ── HAND-DRAWN COVERS ───────────────────────────────────
    // Battle Gear Tournament (Hand-drawn, client commission)
    battleGearTournament1: 'images/battle-gear-tournament.png',
};

function applyImages() {
    document.querySelectorAll('[data-img]').forEach(el => {
        const key = el.dataset.img;
        const src = window.IMAGES[key];
        if (!src) { console.warn('images.js: unknown key ->', key); return; }
        if (el.tagName === 'IMG') {
            el.src = src;
            if (!el.alt) el.alt = key;
        } else {
            el.style.backgroundImage = `url('${src}')`;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyImages);
} else {
    applyImages();
}
