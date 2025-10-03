# For My Baby Ennpo 💖

A romantic interactive website built for Ennpo from Shin 🐻

## Overview

This is a cute and interactive romantic website built with vanilla HTML, CSS, and JavaScript. It features:
- Landing page with animated greeting and days counter
- Sweet random notes
- "Who loves who more?" mini-game (Shin always wins! 😏)
- Secret password-protected page
- Floating hearts animations
- Console easter eggs

**Project Type:** Static Frontend Website  
**Tech Stack:** HTML5, CSS3, Vanilla JavaScript  
**Current State:** Fully functional and ready to use

## Recent Changes

**October 3, 2025:**
- Imported GitHub project into Replit environment
- Set up Python HTTP server to serve static files on port 5000
- Configured workflow for automatic server startup
- Configured autoscale deployment
- Created project documentation
- Added love button with milestone celebrations to home page (5, 10, 25, 50, 100, 200, 500 clicks)
- Fixed broken buttons on game and notes pages
- Implemented love coupons page with preset and custom coupon creation
- Added frosted-glass styled share buttons to all pages (index, notes, game, wouldyourather, secret)
- Fixed coupon modal functionality - both preset and custom coupons now open with share capability
- All share buttons use Web Share API with clipboard fallback for cross-device compatibility

## Project Architecture

### Structure
```
/
├── index.html          # Main landing page
├── css/
│   └── style.css      # Main stylesheet with pastel theme
├── js/
│   └── main.js        # Interactive features and animations
├── pages/
│   ├── notes.html     # Random sweet notes page
│   ├── game.html      # Love game page
│   └── secret.html    # Password-protected secret page
├── assets/
│   └── README.txt     # Placeholder for images/music
└── README.md          # Project documentation
```

### Features

**Landing Page (index.html):**
- Typing animation for greeting
- Days together counter (since October 1, 2025)
- Interactive love button with click counter
- Milestone messages at 5, 10, 25, 50, 100, 200, 500 clicks
- Floating hearts background animation

**Notes Page (pages/notes.html):**
- 30+ random sweet and teasing messages
- Animated note cards with burst effects
- Responsive design for mobile

**Game Page (pages/game.html):**
- "Who loves who more?" questions
- Shin always wins (correct answer)
- Score tracking
- Celebration effects for correct answers

**Secret Page (pages/secret.html):**
- Password-protected with riddle
- Hint: "What's Shin's favorite nickname for Ennpo?"
- Correct answers: bunny, honey, sweetie, cutie, baby
- Special love letter when unlocked

### Technical Details

**Server Setup:**
- Uses Python's built-in HTTP server
- Serves static files on port 5000
- No build process required

**Deployment:**
- Configured for autoscale deployment
- Command: `python -m http.server 5000`

**Browser Compatibility:**
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Running the Project

The project runs automatically on Replit. The server workflow starts the Python HTTP server on port 5000.

To manually restart the server:
```bash
python -m http.server 5000
```

## Console Easter Eggs

Open browser DevTools (F12) and check the console for hidden messages:
- Love declarations
- Fun facts about the relationship
- Random sweet messages every 30 seconds
- Konami code easter egg (↑↑↓↓←→←→BA)

## Customization

- **Colors**: Edit CSS variables in `:root` section of style.css
- **Messages**: Modify the `notes` array in pages/notes.html
- **Questions**: Update the `questions` array in pages/game.html
- **Secret Answers**: Change the `correctAnswers` array in pages/secret.html
- **Start Date**: Modify the `startDate` in js/main.js to change the "Days Together" counter

## Dependencies

- Python 3.11 (for HTTP server)
- No external JavaScript libraries or frameworks

## User Preferences

None specified yet.
