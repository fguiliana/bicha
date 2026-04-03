document.addEventListener('DOMContentLoaded', () => {
    console.log("Et vous ça biche ?");
    console.log("Website made with love by Cam & Flo");

    initPhotoCarousel();
});

function initPhotoCarousel() {
    const carousel = document.querySelector('.photo-carousel');
    if (!carousel) {
        return;
    }

    const track = carousel.querySelector('.photo-carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.photo-carousel__slide'));
    const thumbs = Array.from(carousel.querySelectorAll('.photo-carousel__thumb'));

    if (!track || slides.length === 0 || slides.length !== thumbs.length) {
        return;
    }

    const autoplayDelay = Number(carousel.dataset.autoplay) || 4500;
    const total = slides.length;
    let currentIndex = 0;
    let autoplayTimer = null;

    const goToSlide = (index) => {
        currentIndex = (index + total) % total;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        thumbs.forEach((thumb, thumbIndex) => {
            const isActive = thumbIndex === currentIndex;
            thumb.classList.toggle('is-active', isActive);
            thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    };

    const stopAutoplay = () => {
        if (autoplayTimer !== null) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = window.setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoplayDelay);
    };

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            goToSlide(index);
            startAutoplay();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    goToSlide(0);
    startAutoplay();
}
