// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Card interaction
function highlightCard(card) {
    // Remove previous highlights
    document.querySelectorAll('.featured-card').forEach(c => {
        c.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    // Highlight clicked card
    card.style.background = 'rgba(255, 255, 255, 0.2)';
    
    // Add pulse effect
    card.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
}

// Newsletter subscription
function subscribe() {
    const email = document.getElementById('emailInput').value;
    if (email && email.includes('@')) {
        alert('Thanks for subscribing! You\'ll receive the latest entertainment updates.');
        document.getElementById('emailInput').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Social media interaction
function socialInteraction(platform) {
    const messages = {
        twitter: 'Following PULSE on Twitter!',
        instagram: 'Check out PULSE on Instagram!',
        youtube: 'Subscribe to PULSE on YouTube!',
        facebook: 'Like PULSE on Facebook!'
    };
    alert(messages[platform]);
}

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add random movement to trending items
setInterval(() => {
    const items = document.querySelectorAll('.trending-item');
    items.forEach(item => {
        const randomDelay = Math.random() * 2;
        item.style.animationDelay = `${randomDelay}s`;
    });
}, 5000);