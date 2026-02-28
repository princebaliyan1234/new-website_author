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
    lastSun:        'images/visual-hirearchy-last-sun.png',
    nightwatcher:   'images/The-nightwatcher.jpg',
    ashCityOps:     'images/ash-city-ops.png',
    callerBeasts:   'images/caller-of-the-beasts-5.png',
    processbanner:  'images/webnovel-gig-thumbnail.jpg',
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
