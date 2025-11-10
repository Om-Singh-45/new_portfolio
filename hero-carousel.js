// Prime Video Hero Carousel Functionality

class HeroCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.dots = this.carousel.querySelectorAll('.carousel-dot');
        this.prevBtn = this.carousel.querySelector('.carousel-nav.prev');
        this.nextBtn = this.carousel.querySelector('.carousel-nav.next');
        this.progressBar = this.carousel.querySelector('.carousel-progress-bar');
        
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.progressInterval = null;
        this.autoPlayDuration = 8000; // 8 seconds
        
        this.init();
    }
    
    init() {
        // Show first slide
        this.showSlide(0);
        
        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Start autoplay
        this.startAutoPlay();
    }
    
    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        this.dots[index]?.classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
        this.resetProgress();
    }
    
    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
        this.resetProgress();
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetProgress();
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing intervals
        
        // Auto advance slides
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
        
        // Progress bar animation
        this.startProgress();
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.stopProgress();
    }
    
    pauseAutoPlay() {
        this.stopAutoPlay();
    }
    
    startProgress() {
        this.stopProgress();
        
        let progress = 0;
        const increment = 100 / (this.autoPlayDuration / 100); // Update every 100ms
        
        this.progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
            }
            if (this.progressBar) {
                this.progressBar.style.width = progress + '%';
            }
        }, 100);
    }
    
    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
        this.stopProgress();
        this.startProgress();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.querySelector('.hero-carousel');
    if (carouselElement) {
        new HeroCarousel(carouselElement);
    }
});
