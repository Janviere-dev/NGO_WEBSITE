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

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
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

// Contact form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formStatus = document.getElementById('form-status');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.style.display = 'none';
        
        try {
            const formData = new FormData(contactForm);
            
            // Convert FormData to JSON for Web3Forms
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                formStatus.style.display = 'block';
                formStatus.style.color = '#28a745';
                formStatus.textContent = 'Thank you for helping girls and young women reach their full potential!';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 8 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 8000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            formStatus.style.display = 'block';
            formStatus.style.color = '#dc3545';
            formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again or email us directly at info@hopefortomorrow.org.rw';
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Donation Form Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const donationTypeButtons = document.querySelectorAll('.donation-type-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountGroup = document.getElementById('customAmountGroup');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountSpan = document.getElementById('selectedAmount');
    const monthlyIndicators = document.querySelectorAll('.monthly-indicator');
    
    let isMonthly = false;
    let selectedAmount = 15;

    // Toggle donation type (once vs monthly)
    if (donationTypeButtons.length > 0) {
        donationTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                donationTypeButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.background = 'white';
                    btn.style.color = 'var(--primary-teal)';
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.style.background = 'var(--primary-teal)';
                this.style.color = 'white';
                
                // Update monthly status
                isMonthly = this.dataset.type === 'monthly';
                
                // Show/hide monthly indicators
                monthlyIndicators.forEach(indicator => {
                    indicator.style.display = isMonthly ? 'inline' : 'none';
                });
            });
        });
    }

    // Handle amount button clicks
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active styling from all amount buttons
                amountButtons.forEach(btn => {
                    if (btn.dataset.amount !== 'custom') {
                        btn.style.border = '2px solid #ddd';
                        btn.style.background = 'white';
                        btn.style.color = '#333';
                    }
                });
                
                const amount = this.dataset.amount;
                
                if (amount === 'custom') {
                    // Show custom amount input
                    if (customAmountGroup) {
                        customAmountGroup.style.display = 'block';
                    }
                    this.style.border = '2px solid var(--primary-teal)';
                    this.style.background = 'var(--primary-teal)';
                    this.style.color = 'white';
                } else {
                    // Hide custom amount input
                    if (customAmountGroup) {
                        customAmountGroup.style.display = 'none';
                    }
                    
                    // Highlight selected amount
                    this.style.border = '2px solid var(--primary-teal)';
                    this.style.background = 'var(--primary-teal)';
                    this.style.color = 'white';
                    
                    // Update selected amount
                    selectedAmount = parseInt(amount);
                    updateImpactMessage(selectedAmount);
                }
            });
        });
    }

    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const value = parseInt(this.value) || 0;
            if (value > 0) {
                selectedAmount = value;
                updateImpactMessage(selectedAmount);
            }
        });
    }

    // Update impact message based on amount
    function updateImpactMessage(amount) {
        if (selectedAmountSpan) {
            selectedAmountSpan.textContent = '$' + amount;
        }
        
        // You can add more dynamic impact messages based on different amounts
        const impactMessage = document.querySelector('.impact-message ul');
        if (impactMessage) {
            if (amount >= 50) {
                impactMessage.innerHTML = `
                    <li>School supplies for 10 girls</li>
                    <li>Health workshops for a community</li>
                    <li>Full mentorship program for a year</li>
                `;
            } else if (amount >= 25) {
                impactMessage.innerHTML = `
                    <li>School supplies for 5 girls</li>
                    <li>Health education materials</li>
                    <li>Skills training session</li>
                `;
            } else if (amount >= 15) {
                impactMessage.innerHTML = `
                    <li>School supplies for 3 girls</li>
                    <li>Health education workshops</li>
                    <li>Mentorship program access</li>
                `;
            } else if (amount >= 10) {
                impactMessage.innerHTML = `
                    <li>School supplies for 2 girls</li>
                    <li>Health education materials</li>
                    <li>Basic mentorship support</li>
                `;
            }
        }
    }
});
