// Portfolio Website JavaScript
// Modern, smooth interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initWorkItems();
    initContactForm();
    initParallaxEffects();
    initTypingEffect();
    initAudioPlayer();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Theme toggle functionality
    if (themeToggle) {
        // Check for saved theme preference or default to light theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.classList.toggle('dark-theme', currentTheme === 'dark');
        
        // Theme toggle event listener
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Save theme preference
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (body.classList.contains('dark-theme')) {
                navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (body.classList.contains('dark-theme')) {
                navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-item, .service-card, .about-container, .contact-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Work Items Interactions
function initWorkItems() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click to view project details (placeholder)
        item.addEventListener('click', function() {
            const projectTitle = this.querySelector('.work-title').textContent;
            console.log(`Viewing project: ${projectTitle}`);
            // Here you would typically open a modal or navigate to project page
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Sending...</span><div class="submit-arrow">→</div>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const lines = heroTitle.querySelectorAll('.title-line');
    let currentLine = 0;
    let currentChar = 0;
    
    function typeNextChar() {
        if (currentLine >= lines.length) return;
        
        const line = lines[currentLine];
        const text = line.textContent;
        
        if (currentChar < text.length) {
            line.textContent = text.slice(0, currentChar + 1);
            currentChar++;
            setTimeout(typeNextChar, 100);
        } else {
            currentLine++;
            currentChar = 0;
            setTimeout(typeNextChar, 500);
        }
    }
    
    // Start typing effect after loading screen
    setTimeout(typeNextChar, 2500);
}

// Smooth reveal animations for sections
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-header, .work-item, .service-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Initialize reveal animations
initRevealAnimations();

// Scrambling text animation
function initScramblingText() {
    const scramblingTexts = document.querySelectorAll('.scrambling-text');
    const characters = 'SHAUNGABRIELLETEROL';
    
    scramblingTexts.forEach(textElement => {
        const originalText = textElement.textContent;
        let isAnimating = false;
        
        function scrambleText() {
            if (isAnimating) return;
            isAnimating = true;
            
            let iterations = 0;
            const maxIterations = 20;
            
            const interval = setInterval(() => {
                textElement.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (iterations > maxIterations - 10) {
                            return originalText[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('');
                
                iterations++;
                
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    textElement.textContent = originalText;
                    isAnimating = false;
                }
            }, 100);
        }
        
        // Find the parent image element
        const parentImage = textElement.closest('.about-image, .work-image, .skill-image');
        if (parentImage) {
            parentImage.addEventListener('mouseenter', () => {
                setTimeout(scrambleText, 300); // Start after overlay appears
            });
        }
    });
}

// Initialize scrambling text
initScramblingText();

// Image Modal Functionality
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Get all images that should be clickable
    const clickableImages = document.querySelectorAll('.about-image img, .work-image img, .skill-image img');
    
    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modalCaption.textContent = imageAlt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add click event to all images
    clickableImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(img.src, img.alt);
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize image modal
initImageModal();

// Cursor effects (optional)
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Uncomment to enable cursor effects
// initCursorEffects();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    /* Smooth transitions for all interactive elements */
    a, button, .work-item, .service-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading animation for form submission */
    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Hover effects for work items */
    .work-item:hover .work-overlay {
        opacity: 1;
    }
    
    .work-item:hover .work-image img {
        transform: scale(1.05);
    }
    
    /* Smooth navbar transitions */
    .navbar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Mobile menu animations */
    .nav-menu {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-toggle span {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);

// Audio player functionality
function initAudioPlayer() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (!audio || !playPauseBtn || !volumeSlider) {
        console.log('Audio player elements not found');
        return;
    }
    
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    
    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Audio play failed:', error);
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.volume = volume;
    });
    
    // Handle audio end
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
    
    // Handle audio play/pause events
    audio.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });
    
    audio.addEventListener('pause', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
    
    // Handle audio loading errors
    audio.addEventListener('error', (e) => {
        console.log('Audio loading error:', e);
        showNotification('Audio file not found. Please add "boy-with-balloon.mp3" to your project folder.', 'error');
    });
}

// Export functions for potential external use
window.PortfolioApp = {
    showNotification,
    initLoadingScreen,
    initNavigation,
    initScrollAnimations,
    initAudioPlayer
};