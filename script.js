// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 123, 168, 0.1)';
    } else {
        navbar.style.background = 'rgba(232, 224, 240, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Animate Elements on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Parallax Effect for Stars =====
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.star');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.02;
        const xMove = (x - 0.5) * speed * 100;
        const yMove = (y - 0.5) * speed * 100;
        star.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ===== Achievement Cards Hover Effect =====
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Experience Cards Hover Effect =====
const experienceCards = document.querySelectorAll('.experience-card');
experienceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Hero Carousel =====
const CAROUSEL_INTERVAL = 3000; // 3 seconds as requested

class HeroCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.carousel-card');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.dots = document.querySelectorAll('.progress-dot');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentCount = document.querySelector('.current-count');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.playPauseBtn = document.querySelector('.play-pause-btn');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
        
        this.currentIndex = 0;
        this.isPlaying = true;
        this.progress = 0;
        this.totalCards = this.cards.length;
        this.progressTimer = null;
        
        if (this.cards.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.handleManualNav('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleManualNav('next'));
        }
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Thumbnail clicks
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToCard(index));
        });
        
        // Dot clicks
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToCard(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.handleManualNav('prev');
            if (e.key === 'ArrowRight') this.handleManualNav('next');
            if (e.key === ' ' && e.target === document.body) {
                e.preventDefault();
                this.togglePlayPause();
            }
        });
        
        // Start auto-rotation
        this.startAutoRotation();
    }
    
    goToCard(index) {
        // Remove active class from current
        this.cards[this.currentIndex].classList.remove('active');
        if (this.thumbnails[this.currentIndex]) {
            this.thumbnails[this.currentIndex].classList.remove('active');
        }
        this.dots[this.currentIndex].classList.remove('active');
        
        // Update index
        this.currentIndex = index;
        if (this.currentIndex >= this.totalCards) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.totalCards - 1;
        
        // Add active class to new
        this.cards[this.currentIndex].classList.add('active');
        if (this.thumbnails[this.currentIndex]) {
            this.thumbnails[this.currentIndex].classList.add('active');
        }
        this.dots[this.currentIndex].classList.add('active');
        
        // Update counter
        if (this.currentCount) {
            this.currentCount.textContent = this.currentIndex + 1;
        }
        
        // Reset progress
        this.progress = 0;
        this.updateProgressBar();
    }
    
    goToNext() {
        this.goToCard(this.currentIndex + 1);
    }
    
    goToPrev() {
        this.goToCard(this.currentIndex - 1);
    }
    
    handleManualNav(direction) {
        if (direction === 'prev') {
            this.goToPrev();
        } else {
            this.goToNext();
        }
        
        // Pause temporarily then resume
        this.stopAutoRotation();
        setTimeout(() => {
            if (this.isPlaying) {
                this.startAutoRotation();
            }
        }, 5000);
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.style.display = 'none';
                this.pauseIcon.style.display = 'block';
                this.startAutoRotation();
            } else {
                this.playIcon.style.display = 'block';
                this.pauseIcon.style.display = 'none';
                this.stopAutoRotation();
            }
        }
    }
    
    startAutoRotation() {
        this.stopAutoRotation();
        
        this.progressTimer = setInterval(() => {
            this.progress += (100 / (CAROUSEL_INTERVAL / 100));
            
            if (this.progress >= 100) {
                this.goToNext();
                this.progress = 0;
            }
            
            this.updateProgressBar();
        }, 100);
    }
    
    stopAutoRotation() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }
    
    updateProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = this.isPlaying ? `${this.progress}%` : '0%';
        }
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});

// ===== Console Message =====
console.log('%c Welcome to DELFI A\'s Portfolio! 💜', 
    'background: linear-gradient(135deg, #B8A9C9, #8B7BA8); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Full-Stack Developer | Competitive Programmer | Innovation Enthusiast ✨', 
    'color: #8B7BA8; font-size: 12px;');
console.log('%c 12+ Hackathon Wins | Smart India Hackathon 2025 Winner | AI/ML Enthusiast', 
    'color: #B8A9C9; font-size: 11px;');
