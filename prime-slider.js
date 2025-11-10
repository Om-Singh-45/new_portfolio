// Prime Video Slider Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders
    initSliders();
});

function initSliders() {
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const slider = container.querySelector('.prime-slider');
        const prevBtn = container.querySelector('.slider-prev');
        const nextBtn = container.querySelector('.slider-next');
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        // Scroll amount (one card width + gap)
        const scrollAmount = 335; // 320px card + 15px gap
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Show/hide buttons based on scroll position
        slider.addEventListener('scroll', () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            
            if (slider.scrollLeft <= 0) {
                prevBtn.style.opacity = '0';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }
            
            if (slider.scrollLeft >= maxScroll - 1) {
                nextBtn.style.opacity = '0';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        });
        
        // Initial button state
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (maxScroll <= 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    });
}

// Smooth scroll animation observer for fade-in effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all prime rows (only if they exist)
const primeRows = document.querySelectorAll('.prime-row');
if (primeRows.length > 0) {
    primeRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(30px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(row);
    });
}

// Card hover glow effect (only if cards exist)
const cards = document.querySelectorAll('.prime-card, .skill-prime-card, .education-prime-card');
if (cards.length > 0) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.6))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
}
