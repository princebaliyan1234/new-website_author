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
    queenShadows1:  'images/queen-of-broken-shadows.jpg',   // ← add your file here
    queenShadows2:  'images/queen-of-broken-shadows-2.jpg', // ← add version 2 file here
    poisonedIce1:   'images/Poisoned-Ice-Obsession.png',
    poisonedIce2:   'images/poisoned-ice-obsession-2.jpg',  // ← add version 2 file here
    lastSun:        'images/visual-hirearchy-last-sun.png',
    nightwatcher:   'images/The-nightwatcher.jpg',
    ashCityOps:     'images/aco.png',
    callerBeasts:   'images/caller-of-the-beasts-5.png',
    processbanner:       'images/webnovel-gig-thumbnail.jpg',
    // End World Tutorial [LitRPG]
    endWorld1:           'images/end-world-tutorial-1.png',  // blue ocean version
    endWorld2:           'images/end-world-tutorial-2.png',  // red tentacle version
    endWorld3:           'images/end-world-tutorial-3.png',  // orange fire version
    // The Dao of Reincarnation
    daoReincarnation1:   'images/dao-of-reincarnation-1.png', // solo white bg version
    daoReincarnation2:   'images/dao-of-reincarnation-2.png', // infinity symbol version
    daoReincarnation3:   'images/dao-of-reincarnation-3.png', // spiral tunnel version
    // Cultivating in Seclusion
    cultivatingSeclusion1: 'images/cultivating-in-seclusion.png',
    // God's Blessing: Every Stream Donation I Get 10X Stats
    godsBlessing1:  'images/gods-blessing-1.png',  // main cover (blue ice sword)
    godsBlessing2:  'images/gods-blessing-2.png',  // version 2 (snowy scythe)
    godsBlessing3:  'images/gods-blessing-3.png',  // version 3 (fire/warm tone)
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
