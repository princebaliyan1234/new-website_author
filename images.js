// ============================================================
//  SILENCE OF SCRIBES — images.js
//  ✏️  UPDATE FILENAMES HERE to match your actual local files.
//  All pages read from this one place — change once, fixes all.
// ============================================================

window.IMAGES = {

    // ── Branding ─────────────────────────────────────────────
    logo:           'logo.webp',           // Silence of Scribes logo
    authorAvatar:   'peng.webp',           // Penguin profile pic

    // ── Book covers (your own books) ─────────────────────────
    survivingCover: '1739386302852.jpeg',  // Surviving in the Freezing Apocalypse

    // ── WebNovel cover designs ────────────────────────────────
    vxv1:       'Feb_7__2026__07_25_39_PM.png',               // Villainess x Villain v1 (default)
    vxv2:       'Feb_7__2026__07_25_36_PM.png',               // Villainess x Villain v2
    vxv3:       'ChatGPT_Image_Feb_7__2026__07_17_12_PM.png', // Villainess x Villain v3
    redVoid1:   'red_void_v2.png',         // Red Void Ascension v1 (default)
    redVoid2:   'red_void_v1.png',         // Red Void Ascension v2

    // ── Illustrated covers ────────────────────────────────────
    lastSun:      'visial_hirearchy_last_sun.png',  // The Last Sun
    nightwatcher: 'The_nightwatcher.jpg',            // The Nightwatcher
    ashCityOps:   'ash_city_ops.png',                // Ash City Ops
    callerBeasts: 'caller_of_the_beasts.png',        // Caller of the Beasts

    // ── Process / gig thumbnails ─────────────────────────────
    processbanner: 'webnovel_gig_thumbnail.jpg',     // How I make covers banner
};

// ── Apply images to every [data-img] element on the page ─────
function applyImages() {
    document.querySelectorAll('[data-img]').forEach(el => {
        const key = el.dataset.img;
        const src = window.IMAGES[key];
        if (!src) { console.warn('images.js: unknown key →', key); return; }
        if (el.tagName === 'IMG') {
            el.src = src;
            // Keep alt text meaningful
            if (!el.alt) el.alt = key;
        } else {
            el.style.backgroundImage = `url('${src}')`;
        }
    });
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyImages);
} else {
    applyImages(); // Already loaded
}
