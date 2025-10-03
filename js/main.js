// Console logs for fun hidden messages
console.log("💖 Ennpo is the cutest girlfriend ever! 💖");
console.log("🐻 Shin always wins at love games 😏");
console.log("✨ This website is made with lots of love ✨");

// DOM elements
const greetingTitle = document.getElementById('greetingTitle');
const loveBtn = document.getElementById('loveBtn');
const loveCount = document.getElementById('loveCount');
const milestone = document.getElementById('milestone');
const daysTogether = document.getElementById('daysTogether');
const heartsContainer = document.getElementById('heartsContainer');
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Floating hearts state management
const heartsState = {
    hearts: [],
    maxHearts: 20,
    animationFrameId: null,
    lastHeartTime: 0,
    heartInterval: 2500,
    isMobile: false
};

// Detect mobile devices
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
}

// Dark mode functionality with error handling
function initDarkMode() {
    if (!themeIcon) return;
    
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        }
    } catch (error) {
        console.error('Error accessing localStorage for theme:', error);
    }
}

function toggleDarkMode() {
    if (!themeIcon) return;
    
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        console.log(isDark ? '🌙 Dark mode activated! Easy on the eyes! 🌙' : '☀️ Light mode activated! Bright and cheerful! ☀️');
    } catch (error) {
        console.error('Error saving theme to localStorage:', error);
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Hamburger menu functionality with aria-expanded
function toggleNav() {
    if (!hamburger || !navLinks) return;
    
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', isActive.toString());
}

if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', toggleNav);
}

if (navLinks) {
    const allNavLinks = navLinks.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Love counter state
let clickCount = 0;
let isAnimating = false;

// Milestone messages
const milestones = {
    5: "That's a start! 💕",
    10: "Aww 🥰",
    25: "You're getting there! 😊",
    50: "Okay you REALLY love me!! 🥰✨",
    100: "This is getting out of hand! 😳",
    200: "Okay, I get it! You REALLY REALLY love me! 😳💕",
    500: "STOP! You've proven your point! 😂💖"
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Website loaded! Ready to spread love! 💖");
    
    // Initialize dark mode
    initDarkMode();
    
    // Animate greeting (only on home page)
    animateGreeting();
    
    // Calculate days together (only on home page)
    updateDaysTogether();
    
    // Create floating hearts (global - works on all pages)
    createFloatingHearts();
    
    // Set up love button (only on home page)
    setupLoveButton();
    
    // Update days counter every hour (only on home page)
    if (daysTogether) {
        setInterval(updateDaysTogether, 60 * 60 * 1000);
    }
});

// Animate the greeting with typing effect
function animateGreeting() {
    if (!greetingTitle) return;
    
    const fullText = "Hi Ennpo 💖";
    let currentIndex = 0;
    
    greetingTitle.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
            greetingTitle.textContent += fullText[currentIndex];
            currentIndex++;
        } else {
            clearInterval(typeInterval);
            addCursorEffect();
        }
    }, 150);
}

// Add blinking cursor effect
function addCursorEffect() {
    if (!greetingTitle) return;
    
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    greetingTitle.appendChild(cursor);
    
    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 3000);
}

// Calculate and display days together
function updateDaysTogether() {
    if (!daysTogether) return;
    
    try {
        const startDate = new Date('2025-10-01');
        const today = new Date();
        const timeDiff = today.getTime() - startDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        animateNumber(daysTogether, parseInt(daysTogether.textContent) || 0, daysDiff);
    } catch (error) {
        console.error('Error updating days together:', error);
    }
}

// Animate number changes
function animateNumber(element, start, end) {
    if (!element) return;
    
    const duration = 1000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Create floating hearts animation - OPTIMIZED GLOBAL VERSION
function createFloatingHearts() {
    if (!heartsContainer) return;
    
    // Detect mobile and adjust settings
    heartsState.isMobile = detectMobile();
    if (heartsState.isMobile) {
        heartsState.heartInterval = 4000; // Less frequent on mobile
        heartsState.maxHearts = 10; // Fewer hearts on mobile
    }
    
    // Main animation loop using requestAnimationFrame
    function animateHearts(timestamp) {
        // Clean up removed hearts from array
        heartsState.hearts = heartsState.hearts.filter(heart => heart.element.parentNode);
        
        // Create new heart if conditions are met
        if (timestamp - heartsState.lastHeartTime > heartsState.heartInterval) {
            if (Math.random() < 0.35 && heartsState.hearts.length < heartsState.maxHearts) {
                createHeart();
                heartsState.lastHeartTime = timestamp;
            }
        }
        
        // Continue animation loop
        heartsState.animationFrameId = requestAnimationFrame(animateHearts);
    }
    
    // Start the animation loop
    heartsState.animationFrameId = requestAnimationFrame(animateHearts);
}

// Create a single floating heart
function createHeart() {
    if (!heartsContainer) return;
    if (heartsState.hearts.length >= heartsState.maxHearts) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 6) + 's';
    heart.style.fontSize = '16px';
    
    heartsContainer.appendChild(heart);
    heartsState.hearts.push({ element: heart, createdAt: Date.now() });
    
    // Auto-remove after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Set up love button functionality
function setupLoveButton() {
    if (!loveBtn) return;
    loveBtn.addEventListener('click', handleLoveClick);
}

// Handle love button click
function handleLoveClick() {
    if (isAnimating || !loveBtn) return;
    
    clickCount++;
    isAnimating = true;
    
    // Update counter display
    if (loveCount) {
        loveCount.textContent = `${clickCount} ${clickCount === 1 ? 'click' : 'clicks'}!`;
        loveCount.classList.add('show');
    }
    
    // Create burst effect
    createBurstEffect();
    
    // Check for milestones
    checkMilestone();
    
    // Add button animation
    loveBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        loveBtn.style.transform = 'scale(1)';
        isAnimating = false;
    }, 150);
}

// Create burst effect when button is clicked
function createBurstEffect() {
    if (!loveBtn) return;
    
    const rect = loveBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(${endX}px, ${endY}px) scale(0.5) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 900);
    }
}

// Check for milestone achievements
function checkMilestone() {
    if (!milestone) return;
    
    if (milestones[clickCount]) {
        milestone.textContent = milestones[clickCount];
        milestone.classList.add('show');
        
        if (clickCount >= 50) {
            createConfetti();
        }
        
        setTimeout(() => {
            milestone.classList.remove('show');
        }, 5000);
    }
}

// Create confetti effect for major milestones
function createConfetti() {
    const colors = ['💖', '💕', '💗', '💝', '💘', '💞'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-50px';
            confetti.style.fontSize = '20px';
            confetti.style.animation = 'confetti 3s ease-out forwards';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
}

// Share functionality
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'For My Baby Ennpo 💖',
            text: 'Check out this cute website Shin made for Ennpo!',
            url: window.location.href
        }).catch(() => {});
    } else {
        const url = window.location.href;
        try {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard! 📋');
            }).catch(() => {
                console.error('Failed to copy to clipboard');
            });
        } catch (error) {
            console.error('Clipboard not available:', error);
        }
    }
}

// Create sparkles animation
function createSparkles() {
    setInterval(() => {
        if (Math.random() < 0.2) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
    }, 500);
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes burst {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--end-x, 0), var(--end-y, 0)) scale(0.5); opacity: 0; }
    }
    
    @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Focus visible styles for accessibility */
    *:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    button:focus-visible, 
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Start sparkles
createSparkles();

// Add some fun hover effects
document.addEventListener('DOMContentLoaded', function() {
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert("🎉 Secret unlocked! You're amazing! 🎉\n\nShin loves Ennpo more than words can express! 💖");
        konamiCode = [];
    }
});
