// ============================================
// ANIMATIONS.JS - FILE ANIMAZIONI CAPONIO EVENTS
// Crea questo file nella cartella: static/JS/animations.js
// Poi importalo nell'HTML: <script src="static/JS/animations.js"></script>
// IMPORTANTE: Importa DOPO script.js e DOPO bootstrap
// ============================================

// ============================================
// CONFIGURAZIONE GLOBALE
// ============================================

const ANIMATION_CONFIG = {
    // Soglie di visibilità per attivare le animazioni
    threshold: 0.15,
    
    // Margine prima di attivare (negativo = prima che entri nel viewport)
    rootMargin: '0px 0px -100px 0px',
    
    // Velocità parallax (più basso = più lento)
    parallaxSpeed: 0.15,
    
    // Durata debounce per scroll events (ms)
    scrollDebounce: 10,
    
    // Disabilita animazioni su mobile (risparmia batteria)
    disableOnMobile: true,
    
    // Breakpoint mobile (px)
    mobileBreakpoint: 768
};

// Variabile per tracciare se siamo su mobile
const isMobile = window.innerWidth <= ANIMATION_CONFIG.mobileBreakpoint;
const shouldAnimate = !isMobile || !ANIMATION_CONFIG.disableOnMobile;

// ============================================
// INTERSECTION OBSERVER - SERVIZI SPLIT SCREEN
// ============================================

function initServiziSplitAnimations() {
    const serviziObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aggiungi classe visible per attivare le animazioni CSS
                entry.target.classList.add('visible');
                
                // Opzionale: smetti di osservare dopo l'animazione per performance
                // Togli il commento se vuoi animare solo la prima volta
                // serviziObserver.unobserve(entry.target);
                
                // Rimuovi will-change dopo l'animazione per ottimizzare
                setTimeout(() => {
                    entry.target.classList.add('animation-complete');
                }, 1000);
            }
        });
    }, {
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: ANIMATION_CONFIG.rootMargin
    });

    // Applica l'observer a tutti i blocchi servizi split
    const serviziSplits = document.querySelectorAll('.servizio-split');
    serviziSplits.forEach(split => {
        serviziObserver.observe(split);
    });

    console.log(`✅ Animazioni Servizi Split inizializzate (${serviziSplits.length} blocchi)`);
}

// ============================================
// INTERSECTION OBSERVER - SERVIZI GRIGLIA
// ============================================

function initServiziGridAnimations() {
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Rimuovi will-change dopo animazione
                setTimeout(() => {
                    entry.target.classList.add('animation-complete');
                }, 800);
                
                // Opzionale: osserva solo una volta
                // cardsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const serviziCards = document.querySelectorAll('.servizio-card');
    serviziCards.forEach(card => {
        cardsObserver.observe(card);
    });

    if (serviziCards.length > 0) {
        console.log(`✅ Animazioni Griglia Servizi inizializzate (${serviziCards.length} cards)`);
    }
}

// ============================================
// INTERSECTION OBSERVER - SECTION TITLES
// ============================================

function initSectionTitlesAnimations() {
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // titleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });

    console.log(`✅ Animazioni Titoli inizializzate (${sectionTitles.length} titoli)`);
}

// ============================================
// INTERSECTION OBSERVER - CHI SIAMO
// ============================================

function initChiSiamoAnimations() {
    const chiSiamoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                setTimeout(() => {
                    entry.target.classList.add('animation-complete');
                }, 1000);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    // Anima i blocchi chi siamo
    const chiSiamoBlocks = document.querySelectorAll('.chi-siamo-block');
    chiSiamoBlocks.forEach(block => {
        chiSiamoObserver.observe(block);
    });

    // Anima la quote
    const chiSiamoQuote = document.querySelector('.chi-siamo-quote');
    if (chiSiamoQuote) {
        chiSiamoObserver.observe(chiSiamoQuote);
    }

    console.log(`✅ Animazioni Chi Siamo inizializzate`);
}

// ============================================
// PARALLAX EFFECT - IMMAGINI SERVIZI
// ============================================

let ticking = false;

function updateParallax() {
    if (!shouldAnimate || isMobile) return;

    const scrolled = window.pageYOffset;
    const images = document.querySelectorAll('.servizio-split-image img');
    
    images.forEach(img => {
        const imgTop = img.getBoundingClientRect().top;
        const imgHeight = img.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calcola solo se l'immagine è visibile nel viewport
        if (imgTop < windowHeight && imgTop > -imgHeight) {
            const yPos = -(imgTop * ANIMATION_CONFIG.parallaxSpeed);
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
    
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

function initParallaxEffect() {
    if (!shouldAnimate || isMobile) {
        console.log('⚠️ Parallax disabilitato su mobile');
        return;
    }

    window.addEventListener('scroll', requestParallaxTick, { passive: true });
    console.log('✅ Effetto Parallax inizializzato');
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Ignora se è solo "#"
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Calcola offset della navbar
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✅ Smooth Scroll migliorato');
}

// ============================================
// RIPPLE EFFECT SUI BOTTONI
// ============================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    // Rimuovi ripple precedenti
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);

    // Rimuovi dopo l'animazione
    setTimeout(() => ripple.remove(), 600);
}

function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button, .servizio-cta, .btn-primario-grande');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Aggiungi stili CSS per il ripple
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log(`✅ Ripple Effect inizializzato (${buttons.length} bottoni)`);
}

// ============================================
// SCROLL REVEAL GENERICO
// ============================================

function initScrollReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Applica a elementi con classe .scroll-reveal
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    if (revealElements.length > 0) {
        console.log(`✅ Scroll Reveal inizializzato (${revealElements.length} elementi)`);
    }
}

// ============================================
// NAVBAR ANIMATION ON SCROLL
// ============================================

function initNavbarAnimation() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Aggiungi/rimuovi classe scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Opzionale: nascondi navbar quando scroll down, mostra quando scroll up
        // Decommentare se vuoi questa funzionalità
        /*
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        */

        lastScroll = currentScroll;
    }, { passive: true });

    console.log('✅ Navbar Animation inizializzata');
}

// ============================================
// LAZY LOADING IMMAGINI MIGLIORATO
// ============================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Aggiungi skeleton loading
                    img.classList.add('loading-skeleton');
                    
                    // Carica immagine
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        
                        img.addEventListener('load', () => {
                            img.classList.remove('loading-skeleton');
                            img.classList.add('loaded');
                        });
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        // Trova tutte le immagini con data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

        if (lazyImages.length > 0) {
            console.log(`✅ Lazy Loading inizializzato (${lazyImages.length} immagini)`);
        }
    }
}

// ============================================
// PRELOADER PAGE
// ============================================

function initPageLoader() {
    // Aggiungi fade in alla pagina al caricamento
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('✅ Page Loader inizializzato');
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;

                console.log('📊 Performance Metrics:');
                console.log(`  - Page Load Time: ${pageLoadTime}ms`);
                console.log(`  - Server Response Time: ${connectTime}ms`);
                console.log(`  - Render Time: ${renderTime}ms`);
            }, 0);
        });
    }
}

// ============================================
// RESIZE HANDLER
// ============================================

let resizeTimer;

function handleResize() {
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(() => {
        const newIsMobile = window.innerWidth <= ANIMATION_CONFIG.mobileBreakpoint;
        
        // Se cambiano le dimensioni, ricarica la pagina per resettare le animazioni
        if (newIsMobile !== isMobile) {
            console.log('🔄 Viewport cambiato, ricaricare per ottimizzare animazioni');
            // Opzionale: location.reload();
        }
    }, 250);
}

function initResizeHandler() {
    window.addEventListener('resize', handleResize, { passive: true });
}

// ============================================
// CLEANUP - Rimuovi listeners quando la pagina viene chiusa
// ============================================

function cleanup() {
    window.removeEventListener('scroll', requestParallaxTick);
    window.removeEventListener('resize', handleResize);
    console.log('🧹 Cleanup completato');
}

window.addEventListener('beforeunload', cleanup);

// ============================================
// INIZIALIZZAZIONE MASTER
// ============================================

function initAllAnimations() {
    console.log('🎬 Inizializzazione animazioni Caponio Events...');
    console.log(`📱 Dispositivo: ${isMobile ? 'Mobile' : 'Desktop'}`);
    console.log(`⚙️ Animazioni: ${shouldAnimate ? 'Abilitate' : 'Disabilitate'}`);
    
    // Inizializza tutte le animazioni
    initSectionTitlesAnimations();
    initServiziSplitAnimations();
    initServiziGridAnimations();
    initChiSiamoAnimations();
    initParallaxEffect();
    initSmoothScroll();
    initRippleEffect();
    initScrollReveal();
    initNavbarAnimation();
    initLazyLoading();
    initPageLoader();
    initResizeHandler();
    
    // Performance monitoring (solo in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        logPerformanceMetrics();
    }
    
    console.log('✨ Tutte le animazioni inizializzate con successo!');
}

// ============================================
// AUTO-INIT quando il DOM è pronto
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    // DOM già caricato
    initAllAnimations();
}

// ============================================
// EXPORT per uso manuale (opzionale)
// ============================================

// Se vuoi chiamare manualmente le funzioni, puoi usare:
window.CaponioAnimations = {
    init: initAllAnimations,
    parallax: initParallaxEffect,
    servizi: initServiziSplitAnimations,
    chiSiamo: initChiSiamoAnimations,
    config: ANIMATION_CONFIG
};

// Esempio di uso manuale:
// window.CaponioAnimations.init(); // Inizializza tutto
// window.CaponioAnimations.parallax(); // Solo parallax