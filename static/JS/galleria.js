// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleriaItems = document.querySelectorAll('.galleria-item');

let currentImageIndex = 0;
const allImages = Array.from(galleriaItems);

// Apri lightbox
galleriaItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        const img = item.querySelector('img');
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Chiudi lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Navigazione frecce
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    lightboxImg.src = allImages[currentImageIndex].querySelector('img').src;
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    lightboxImg.src = allImages[currentImageIndex].querySelector('img').src;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// ============================================
// PROTEZIONE ANTI-DOWNLOAD
// ============================================

// Previeni click destro su tutte le immagini
document.querySelectorAll('.galleria-item img, .lightbox-content').forEach(img => {
    img.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Previeni drag
    img.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });
});

// Disabilita tasti per salvare immagini (Ctrl+S, Cmd+S)
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
    }
});