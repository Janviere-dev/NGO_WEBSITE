// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero Slider/Carousel
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        showSlide(index);
    }
}

// Initialize slider if it exists
if (slides.length > 0) {
    showSlide(0);
    
    // Auto-play slider
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    startAutoPlay();
    
    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Indicator controls
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
}

// Navbar scroll effect - Transparent at top, orange on scroll, disappear on more scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const scrollThresholdOrange = 50;    // When to turn orange
const scrollThresholdHide = 150;     // When to disappear

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // At top - transparent navbar, visible
    if (currentScroll <= scrollThresholdOrange) {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('scroll-down');
        lastScroll = currentScroll;
        return;
    }
    
    // Small scroll - make navbar orange
    if (currentScroll > scrollThresholdOrange && currentScroll <= scrollThresholdHide) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('scroll-down');
    }
    
    // More scroll - hide navbar
    if (currentScroll > scrollThresholdHide) {
        navbar.classList.add('scroll-down');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card, .mv-card, .team-member, .value-item, .value-card').forEach(el => {
    observer.observe(el);
});

// Mission & vision cards - group behavior (click one, open/close both)
const mvCards = document.querySelectorAll('.mission-vision-cards .interactive-card');
mvCards.forEach(card => {
    card.addEventListener('click', () => {
        const anyActive = Array.from(mvCards).some(c => c.classList.contains('active'));
        if (anyActive) {
            mvCards.forEach(c => c.classList.remove('active'));
        } else {
            mvCards.forEach(c => c.classList.add('active'));
        }
    });
});

// Core values - group behavior (click one, open/close all together)
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach(card => {
    card.addEventListener('click', () => {
        const anyActive = Array.from(valueCards).some(c => c.classList.contains('active'));
        if (anyActive) {
            valueCards.forEach(c => c.classList.remove('active'));
        } else {
            valueCards.forEach(c => c.classList.add('active'));
        }
    });
});

// Impact counters
const counters = document.querySelectorAll('.counter');
const duration = 2000; // total animation duration in ms
const restartDelay = 2000; // delay between loops in ms
let countersLoopStarted = false;

function startCountersLoop() {
    if (countersLoopStarted) return;
    countersLoopStarted = true;

    const runOnce = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now();
            counter.innerText = '0';

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);

                counter.innerText = value;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCount);
        });

        setTimeout(runOnce, duration + restartDelay);
    };

    runOnce();
}

if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCountersLoop();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
}

