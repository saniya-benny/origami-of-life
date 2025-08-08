// DOM elements - Get references to important HTML elements
const magicBox = document.getElementById('magicBox');
const origamiDisplay = document.getElementById('origamiDisplay');

// State variables - Track the current state of the app
let isShaking = false; // Prevents multiple shakes at once
let currentItem = null; // Tracks which origami item is currently shown

// Origami items data - Define the two possible origami items
const origamiItems = [
    {
        type: 'dove',
        emoji: '🕊️',
        color: '#40e0d0',
        message: 'Peace and Freedom'
    },
    {
        type: 'butterfly',
        emoji: '🦋',
        color: '#ff69b4',
        message: 'Transformation and Beauty'
    }
];

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Origami of Life app initialized');
    
    // Set up event listeners for different interaction methods
    setupClickEvents();
    setupShakeDetection();
    setupTouchEvents();
    
    // Add some initial animations
    addInitialAnimations();
});

// Set up click events for desktop users
function setupClickEvents() {
    // Listen for clicks on the magic box
    magicBox.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Box clicked!');
        shakeBox();
    });
    
    // Listen for keyboard events (spacebar and enter)
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            console.log('Keyboard trigger activated');
            shakeBox();
        }
    });
}

// Set up shake detection for mobile devices
function setupShakeDetection() {
    // Check if device supports motion sensors
    if (window.DeviceMotionEvent) {
        console.log('Device motion supported - shake detection enabled');
        
        let lastUpdate = 0;
        let lastX = 0, lastY = 0, lastZ = 0;
        const shakeThreshold = 15; // Sensitivity for shake detection
        
        // Listen for device motion events
        window.addEventListener('devicemotion', function(e) {
            const current = e.accelerationIncludingGravity;
            const currentTime = new Date().getTime();
            
            // Only check every 100ms to avoid too many triggers
            if ((currentTime - lastUpdate) > 100) {
                const diffTime = currentTime - lastUpdate;
                lastUpdate = currentTime;
                
                // Calculate movement speed
                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;
                
                // If speed is above threshold, trigger shake
                if (speed > shakeThreshold) {
                    console.log('Device shaken! Speed:', speed);
                    shakeBox();
                }
                
                // Update last position
                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        });
    } else {
        console.log('Device motion not supported - shake detection disabled');
    }
}

// Set up touch events for mobile devices
function setupTouchEvents() {
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // Minimum swipe distance to trigger
    
    // Listen for touch start
    magicBox.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    // Listen for touch end
    magicBox.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = Math.abs(touchStartY - touchEndY);
        
        // If swipe distance is significant, trigger shake
        if (swipeDistance > swipeThreshold) {
            console.log('Touch swipe detected! Distance:', swipeDistance);
            shakeBox();
        }
    });
}

// Main function to shake the box and reveal an origami item
function shakeBox() {
    // Prevent multiple shakes at once
    if (isShaking) {
        console.log('Already shaking - ignoring trigger');
        return;
    }
    
    isShaking = true;
    console.log('Starting box shake animation');
    
    // Add shake animation class to the box
    magicBox.classList.add('shake');
    
    // Remove shake class after animation completes
    setTimeout(() => {
        magicBox.classList.remove('shake');
        revealOrigamiItem();
    }, 500); // Match the shake animation duration
}

// Function to reveal a random origami item
function revealOrigamiItem() {
    console.log('Revealing origami item');
    
    // Clear any existing item
    clearOrigamiDisplay();
    
    // Randomly select one of the two origami items
    const randomIndex = Math.floor(Math.random() * origamiItems.length);
    const selectedItem = origamiItems[randomIndex];
    
    console.log('Selected item:', selectedItem.type);
    
    // Create the origami item element
    const origamiElement = createOrigamiElement(selectedItem);
    
    // Add it to the display area
    origamiDisplay.appendChild(origamiElement);
    
    // Trigger the show animation after a brief delay
    setTimeout(() => {
        origamiElement.classList.add('show');
        currentItem = selectedItem;
    }, 100);
    
    // Reset shaking state after a delay
    setTimeout(() => {
        isShaking = false;
    }, 1000);
}

// Function to create the HTML element for an origami item
function createOrigamiElement(item) {
    const element = document.createElement('div');
    element.className = `origami-item ${item.type}`;
    element.innerHTML = `
        <div class="origami-emoji">${item.emoji}</div>
        <div class="origami-message">${item.message}</div>
    `;
    
    // Add custom styling based on the item type
    element.style.color = item.color;
    
    return element;
}

// Function to clear the origami display area
function clearOrigamiDisplay() {
    // Remove all existing origami items
    const existingItems = origamiDisplay.querySelectorAll('.origami-item');
    existingItems.forEach(item => {
        item.classList.remove('show');
        setTimeout(() => {
            item.remove();
        }, 300); // Wait for fade out animation
    });
    
    currentItem = null;
}

// Function to add initial animations when the page loads
function addInitialAnimations() {
    // Add a subtle entrance animation to the box
    magicBox.style.opacity = '0';
    magicBox.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        magicBox.style.transition = 'all 1s ease-out';
        magicBox.style.opacity = '1';
        magicBox.style.transform = 'translateY(0)';
    }, 500);
    
    // Add entrance animation to the title
    const title = document.querySelector('.title');
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        title.style.transition = 'all 1s ease-out';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 200);
}

// Add some utility functions for debugging and testing
window.OrigamiOfLife = {
    // Function to manually trigger a shake (for testing)
    triggerShake: shakeBox,
    
    // Function to get current item
    getCurrentItem: () => currentItem,
    
    // Function to force show a specific item (for testing)
    showItem: (itemType) => {
        const item = origamiItems.find(i => i.type === itemType);
        if (item) {
            clearOrigamiDisplay();
            const element = createOrigamiElement(item);
            origamiDisplay.appendChild(element);
            setTimeout(() => {
                element.classList.add('show');
                currentItem = item;
            }, 100);
        }
    },
    
    // Function to reset the display
    reset: () => {
        clearOrigamiDisplay();
        isShaking = false;
    }
};

// Add some console logging for debugging
console.log('Origami of Life JavaScript loaded successfully');
console.log('Available functions:', Object.keys(window.OrigamiOfLife));
