document.addEventListener('DOMContentLoaded', () => {
    console.log("Et vous ça biche ?");
    console.log("Website made with love by Cam & Flo");

    initRevealAnimations();
    initStickyNav();
    initDateMin();
    initSlideshow();
});

/* Reveal on scroll */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* Sticky nav */
function initStickyNav() {
    const hero = document.getElementById('hero');
    const nav = document.querySelector('.sticky-nav');
    if (!hero || !nav) return;

    const observer = new IntersectionObserver(([entry]) => {
        nav.classList.toggle('nav--visible', !entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(hero);
}

/* Slideshow – Embla Carousel */
function initSlideshow() {
    const viewport = document.querySelector('.embla');
    if (!viewport || typeof EmblaCarousel === 'undefined') return;

    const btnPrev = document.querySelector('.slideshow__btn--prev');
    const btnNext = document.querySelector('.slideshow__btn--next');

    const embla = EmblaCarousel(viewport, {
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
    });

    const updateButtons = () => {
        if (btnPrev) btnPrev.disabled = !embla.canScrollPrev();
        if (btnNext) btnNext.disabled = !embla.canScrollNext();
    };

    btnPrev?.addEventListener('click', () => embla.scrollPrev());
    btnNext?.addEventListener('click', () => embla.scrollNext());

    embla.on('select', updateButtons);
    embla.on('init', updateButtons);
    embla.on('reInit', updateButtons);
}

/* Block past dates on form */
function initDateMin() {
    const dateInput = document.getElementById('date_event');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
}
