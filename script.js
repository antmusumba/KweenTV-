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

// Header background change on scroll (with debounce and class toggle)
function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}, 10));

// Card interaction (keyboard accessible)
document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', () => highlightCard(card));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            highlightCard(card);
        }
    });
});

function highlightCard(card) {
    document.querySelectorAll('.featured-card').forEach(c => {
        c.style.background = 'rgba(255, 255, 255, 0.1)';
        c.setAttribute('aria-pressed', 'false');
    });
    card.style.background = 'rgba(255, 255, 255, 0.2)';
    card.setAttribute('aria-pressed', 'true');
    card.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
}

// Newsletter subscription (form, better validation)
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Thanks for subscribing! You\'ll receive the latest entertainment updates.');
        document.getElementById('emailInput').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Social media interaction (event delegation)
document.querySelector('.social-links').addEventListener('click', function(e) {
    if (e.target.matches('a[data-platform]')) {
        e.preventDefault();
        const platform = e.target.getAttribute('data-platform');
        const messages = {
            twitter: 'Following PULSE on Twitter!',
            instagram: 'Check out PULSE on Instagram!',
            youtube: 'Subscribe to PULSE on YouTube!',
            facebook: 'Like PULSE on Facebook!'
        };
        alert(messages[platform]);
    }
});

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