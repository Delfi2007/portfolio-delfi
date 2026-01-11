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

// ===== Console Message =====
console.log('%c Welcome to DELFI A\'s Portfolio! 💜', 
    'background: linear-gradient(135deg, #B8A9C9, #8B7BA8); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Full-Stack Developer | Competitive Programmer | Innovation Enthusiast ✨', 
    'color: #8B7BA8; font-size: 12px;');
console.log('%c 12+ Hackathon Wins | Smart India Hackathon 2025 Winner | AI/ML Enthusiast', 
    'color: #B8A9C9; font-size: 11px;');
