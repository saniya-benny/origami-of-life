// DOM elements
const origamiPaper = document.getElementById('origamiPaper');
const foldBtn = document.getElementById('foldBtn');
const title = document.getElementById('title');

// State variables
let isRotating = true;
let currentRotation = 0;
let isShaking = false;

// Initialize the application
function init() {
    // Add hover effects for origami paper
    origamiPaper.addEventListener('mouseenter', () => {
        origamiPaper.style.transform = 'scale(1.05)';
    });

    origamiPaper.addEventListener('mouseleave', () => {
        origamiPaper.style.transform = '';
    });

    // Add fold button click event
    foldBtn.addEventListener('click', handleFoldClick);
    
    // Add title animation
    addTitleAnimation();

    // Add click/tap to shake and unfold
    setupShakeUnfold();
}

function setupShakeUnfold() {
    const starfield = document.querySelector('.starfield');

    function triggerShakeSequence() {
        if (isShaking) return;
        isShaking = true;

        // Add shake class + glow
        origamiPaper.classList.add('shake');
        origamiPaper.classList.add('glow');

        // After shake, unfold cube and reveal starfield
        setTimeout(() => {
            origamiPaper.classList.remove('shake');
            origamiPaper.classList.add('unfold');
            if (starfield) starfield.classList.add('visible');
        }, 520);

        // After unfold completes, float in space a bit
        setTimeout(() => {
            // subtle floating effect via CSS transform
            origamiPaper.style.transition = 'transform 2000ms ease';
            origamiPaper.style.transform = 'translateZ(-40px) scale(0.96)';
        }, 1200);

        // Reset after a short showcase
        setTimeout(() => {
            // reset classes and transforms so user can trigger again
            origamiPaper.classList.remove('glow');
            origamiPaper.classList.remove('unfold');
            origamiPaper.style.transform = '';
            if (starfield) starfield.classList.remove('visible');
            isShaking = false;
        }, 3600);
    }

    // Click / tap
    origamiPaper.addEventListener('click', (e) => {
        e.preventDefault();
        triggerShakeSequence();
    });

    // Keyboard (space/enter)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            triggerShakeSequence();
        }
    });

    // Device motion shake detection
    if (window.DeviceMotionEvent) {
        let lastUpdate = 0;
        let lastX = 0, lastY = 0, lastZ = 0;
        const shakeThreshold = 15;
        window.addEventListener('devicemotion', (e) => {
            const current = e.accelerationIncludingGravity;
            const currentTime = Date.now();
            if ((currentTime - lastUpdate) > 100) {
                const diffTime = currentTime - lastUpdate;
                lastUpdate = currentTime;
                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;
                if (speed > shakeThreshold) {
                    triggerShakeSequence();
                }
                lastX = current.x; lastY = current.y; lastZ = current.z;
            }
        });
    }
}

// Handle fold button click
function handleFoldClick() {
    // Add click animation
    foldBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        foldBtn.style.transform = '';
    }, 150);
    
    // Navigate to page2.html
    setTimeout(() => {
        window.location.href = 'page2.html';
    }, 300);
}

// Add title animation effects
function addTitleAnimation() {
    // Add subtle floating animation to title
    title.style.animation = 'titleFloat 6s ease-in-out infinite';
    
    // Add CSS for title floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes titleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Add particle effects for visual enhancement
function createParticles() {
    const particles = [];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #ffffff, #f0f0f0);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            opacity: 0;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

// Animate particles around the origami paper
function animateParticles(particles) {
    particles.forEach((particle, index) => {
        const delay = index * 80;
        const angle = (index / particles.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 60;
        
        setTimeout(() => {
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.opacity = '1';
            
            const endX = startX + Math.cos(angle) * radius;
            const endY = startY + Math.sin(angle) * radius;
            
            particle.style.transition = 'all 2.5s ease-out';
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
            
            setTimeout(() => {
                particle.remove();
            }, 2500);
        }, delay);
    });
}

// Add grid animation
function addGridAnimation() {
    const gridBackground = document.querySelector('.grid-background');
    
    // Add subtle grid movement
    let gridOffset = 0;
    setInterval(() => {
        gridOffset += 0.5;
        gridBackground.style.transform = `translate(${gridOffset}px, ${gridOffset}px)`;
    }, 100);
}

// Add smooth scroll behavior
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add parallax effect to background
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        const speed = scrolled * 0.3;
        
        parallax.style.transform = `translateY(${speed}px)`;
    });
}

// Add responsive behavior
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Adjust origami paper size based on screen size
    if (isSmallMobile) {
        origamiPaper.style.transform = 'scale(0.9)';
    } else if (isMobile) {
        origamiPaper.style.transform = 'scale(1)';
    } else {
        origamiPaper.style.transform = 'scale(1)';
    }
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels
    origamiPaper.setAttribute('role', 'button');
    origamiPaper.setAttribute('tabindex', '0');
    origamiPaper.setAttribute('aria-label', 'Black cube with neon cracks. Click or press space/enter to shake and unfold into starfield.');
    foldBtn.setAttribute('aria-label', 'Go to next page');
    
    // Add focus management
    origamiPaper.addEventListener('focus', () => {
        origamiPaper.style.outline = '2px solid #ffffff';
        origamiPaper.style.outlineOffset = '4px';
    });
    
    origamiPaper.addEventListener('blur', () => {
        origamiPaper.style.outline = '';
        origamiPaper.style.outlineOffset = '';
    });
    
    foldBtn.addEventListener('focus', () => {
        foldBtn.style.outline = '2px solid #ffffff';
        foldBtn.style.outlineOffset = '2px';
    });
    
    foldBtn.addEventListener('blur', () => {
        foldBtn.style.outline = '';
        foldBtn.style.outlineOffset = '';
    });
}

// Add performance optimizations
function addPerformanceOptimizations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update any continuous animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Optimize scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateAnimations, 16);
    });
}

// Add error handling
function addErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addParallaxEffect();
    addAccessibilityFeatures();
    addPerformanceOptimizations();
    addErrorHandling();
    addGridAnimation();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Create particles for special effects
    const particles = createParticles();
    
    // Trigger particle animation periodically
    setInterval(() => {
        animateParticles(particles);
    }, 10000); // Every 10 seconds
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential external use
window.OrigamiOfLife = {
    navigateToNextPage: handleFoldClick,
    getCurrentRotation: () => currentRotation
};
