// Console logs for fun hidden messages
console.log("💖 Ennpo is the cutest girlfriend ever! 💖");
console.log("🐻 Shin always wins at love games 😏");
console.log("✨ This website is made with lots of love ✨");
console.log("🎀 Found the secret messages? You're amazing! 🎀");

// DOM elements
const greetingTitle = document.getElementById('greetingTitle');
const loveBtn = document.getElementById('loveBtn');
const loveCount = document.getElementById('loveCount');
const milestone = document.getElementById('milestone');
const daysTogether = document.getElementById('daysTogether');
const heartsContainer = document.getElementById('heartsContainer');

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
    
    // Animate greeting
    animateGreeting();
    
    // Calculate days together
    updateDaysTogether();
    
    // Create floating hearts
    createFloatingHearts();
    
    // Set up love button
    setupLoveButton();
    
    // Update days counter every hour
    setInterval(updateDaysTogether, 60 * 60 * 1000);
});

// Animate the greeting with typing effect
function animateGreeting() {
    const fullText = "Hi Ennpo 💖";
    let currentIndex = 0;
    
    greetingTitle.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
            greetingTitle.textContent += fullText[currentIndex];
            currentIndex++;
        } else {
            clearInterval(typeInterval);
            // Add cursor blinking effect
            addCursorEffect();
        }
    }, 150);
}

// Add blinking cursor effect
function addCursorEffect() {
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    greetingTitle.appendChild(cursor);
    
    // Remove cursor after 3 seconds
    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 3000);
}

// Calculate and display days together
function updateDaysTogether() {
    const startDate = new Date('2025-10-01');
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    // Animate the number change
    animateNumber(daysTogether, parseInt(daysTogether.textContent) || 0, daysDiff);
}

// Animate number changes
function animateNumber(element, start, end) {
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

// Create floating hearts animation
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createHeart();
        }
    }, 2000);
}

// Create a single floating heart
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Set up love button functionality
function setupLoveButton() {
    loveBtn.addEventListener('click', handleLoveClick);
}

// Handle love button click
function handleLoveClick() {
    if (isAnimating) return;
    
    clickCount++;
    isAnimating = true;
    
    // Update counter display
    loveCount.textContent = `${clickCount} ${clickCount === 1 ? 'click' : 'clicks'}!`;
    loveCount.classList.add('show');
    
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
    
    // Console log for fun
    console.log(`💖 Love click #${clickCount}! Ennpo loves Shin! 💖`);
}

// Create burst effect when button is clicked
function createBurstEffect() {
    const rect = loveBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple hearts for burst effect
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = '💖';
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '20px';
            heart.style.animation = 'burst 1s ease-out forwards';
            heart.style.zIndex = '1000';
            
            // Random direction for burst
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.style.setProperty('--end-x', endX + 'px');
            heart.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1000);
        }, i * 50);
    }
}

// Check for milestone achievements
function checkMilestone() {
    if (milestones[clickCount]) {
        milestone.textContent = milestones[clickCount];
        milestone.classList.add('show');
        
        // Special effects for major milestones
        if (clickCount >= 50) {
            createConfetti();
        }
        
        // Hide milestone after 5 seconds
        setTimeout(() => {
            milestone.classList.remove('show');
        }, 5000);
        
        console.log(`🎉 Milestone reached: ${clickCount} clicks! ${milestones[clickCount]} 🎉`);
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
`;
document.head.appendChild(style);

// Add some fun hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
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
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log("🎮 Konami code activated! You found the secret! 🎮");
        alert("🎉 Secret unlocked! You're amazing! 🎉\n\nShin loves Ennpo more than words can express! 💖");
        konamiCode = [];
    }
});

// Add some random console messages
setInterval(() => {
    const messages = [
        "💖 Ennpo makes every day brighter! 💖",
        "🐻 Shin is the luckiest boyfriend ever! 🐻",
        "✨ This love story is just beginning! ✨",
        "🎀 You two are perfect together! 🎀",
        "💕 Love is in the air! 💕"
    ];
    
    if (Math.random() < 0.1) { // 10% chance every interval
        console.log(messages[Math.floor(Math.random() * messages.length)]);
    }
}, 30000); // Every 30 seconds
