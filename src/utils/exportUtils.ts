
import { FlashcardData, CustomizationSettings } from '@/types/flashcard';

export const generateExportCode = (cards: FlashcardData[], customization: CustomizationSettings): string => {
  const cardsJson = JSON.stringify(cards);
  const configJson = JSON.stringify(customization);

  // Generate the complete flashcard HTML content
  const flashcardContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Flashcards</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${customization.typography.fontFamily};
            background: ${customization.colors.background};
            color: ${customization.colors.text};
            min-height: 100vh;
            overflow-x: hidden;
        }

        .flashcard-container {
            min-height: 100vh;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .header h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .header .counter {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .progress-container {
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        .card-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .card-container {
            perspective: 1000px;
            width: 100%;
            max-width: 600px;
            height: ${customization.dimensions.cardHeight};
            cursor: pointer;
            user-select: none;
        }

        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .card-inner.flipped {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            background: ${customization.colors.cardBg};
            color: ${customization.colors.cardText};
            border-radius: ${customization.dimensions.borderRadius};
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .card-back {
            transform: rotateY(180deg);
        }

        .card-content {
            width: 100%;
        }

        .card-term {
            font-size: ${customization.typography.termSize};
            font-weight: 600;
            margin-bottom: 1rem;
            line-height: 1.3;
        }

        .card-definition {
            font-size: ${customization.typography.definitionSize};
            line-height: 1.5;
            margin-bottom: 1rem;
        }

        .card-hint {
            font-size: 0.85rem;
            opacity: 0.6;
            margin-top: 1rem;
        }

        .controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
            font-weight: 500;
            min-width: 100px;
        }

        .btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .keyboard-hints {
            text-align: center;
            font-size: 0.8rem;
            opacity: 0.6;
            margin-top: 1rem;
        }

        @media (max-width: 768px) {
            .flashcard-container {
                padding: 1rem 0.5rem;
            }
            
            .header h1 {
                font-size: 1.5rem;
            }
            
            .card-container {
                height: 250px;
            }
            
            .card-face {
                padding: 1.5rem;
            }
            
            .controls {
                gap: 0.5rem;
            }
            
            .btn {
                padding: 0.6rem 1rem;
                font-size: 0.8rem;
                min-width: 80px;
            }
        }
    </style>
</head>
<body>
    <div class="flashcard-container">
        <div class="header">
            <h1>Flashcard Study</h1>
            <div class="counter" id="counter" ${!customization.features.showCounter ? 'style="display:none"' : ''}>
                Card 1 of 0
            </div>
        </div>

        <div class="progress-container" ${!customization.features.showProgress ? 'style="display:none"' : ''}>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
            </div>
        </div>

        <div class="card-wrapper">
            <div class="card-container" id="cardContainer">
                <div class="card-inner" id="cardInner">
                    <div class="card-face card-front">
                        <div class="card-content">
                            <div class="card-term" id="cardTerm">Loading...</div>
                            <div class="card-hint" style="color: ${customization.colors.primary}">
                                Click to reveal answer
                            </div>
                        </div>
                    </div>
                    <div class="card-face card-back">
                        <div class="card-content">
                            <div class="card-definition" id="cardDefinition">Loading...</div>
                            <div class="card-hint" style="color: ${customization.colors.secondary}">
                                Click to see question
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls">
            <button class="btn" id="prevBtn">Previous</button>
            <button class="btn" id="nextBtn">Next</button>
            <button class="btn" id="shuffleBtn" ${!customization.features.showShuffle ? 'style="display:none"' : ''}>Shuffle</button>
            <button class="btn" id="restartBtn">Restart</button>
        </div>

        <div class="keyboard-hints">
            Use ← → arrow keys to navigate • Space to flip cards
        </div>
    </div>

    <script>
        // Flashcard data and configuration
        const flashcards = ${cardsJson};
        const config = ${configJson};
        
        // Application state
        let currentIndex = 0;
        let isFlipped = false;
        let studyCards = [...flashcards];
        
        // DOM elements
        const cardContainer = document.getElementById('cardContainer');
        const cardInner = document.getElementById('cardInner');
        const cardTerm = document.getElementById('cardTerm');
        const cardDefinition = document.getElementById('cardDefinition');
        const counter = document.getElementById('counter');
        const progressFill = document.getElementById('progressFill');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        // Initialize the application
        function init() {
            if (studyCards.length === 0) {
                cardTerm.textContent = 'No cards available';
                cardDefinition.textContent = 'Please add some cards to study';
                return;
            }
            
            updateCard();
            updateUI();
            bindEvents();
        }
        
        // Update the current card display
        function updateCard() {
            if (studyCards.length === 0) return;
            
            const card = studyCards[currentIndex];
            cardTerm.textContent = card.term;
            cardDefinition.textContent = card.definition;
            
            // Reset flip state
            isFlipped = false;
            cardInner.classList.remove('flipped');
        }
        
        // Update UI elements
        function updateUI() {
            if (studyCards.length === 0) return;
            
            // Update counter
            if (counter) {
                counter.textContent = \`Card \${currentIndex + 1} of \${studyCards.length}\`;
            }
            
            // Update progress
            if (progressFill) {
                const progress = ((currentIndex + 1) / studyCards.length) * 100;
                progressFill.style.width = progress + '%';
            }
            
            // Update button states
            const hasMultipleCards = studyCards.length > 1;
            prevBtn.disabled = !hasMultipleCards;
            nextBtn.disabled = !hasMultipleCards;
            if (shuffleBtn) shuffleBtn.disabled = !hasMultipleCards;
        }
        
        // Navigation functions
        function nextCard() {
            if (studyCards.length <= 1) return;
            currentIndex = (currentIndex + 1) % studyCards.length;
            updateCard();
            updateUI();
        }
        
        function prevCard() {
            if (studyCards.length <= 1) return;
            currentIndex = (currentIndex - 1 + studyCards.length) % studyCards.length;
            updateCard();
            updateUI();
        }
        
        function flipCard() {
            isFlipped = !isFlipped;
            cardInner.classList.toggle('flipped', isFlipped);
        }
        
        function shuffleCards() {
            studyCards = [...studyCards].sort(() => Math.random() - 0.5);
            currentIndex = 0;
            updateCard();
            updateUI();
        }
        
        function restart() {
            currentIndex = 0;
            updateCard();
            updateUI();
        }
        
        // Event bindings
        function bindEvents() {
            // Card click to flip
            cardContainer.addEventListener('click', flipCard);
            
            // Button events
            prevBtn.addEventListener('click', prevCard);
            nextBtn.addEventListener('click', nextCard);
            if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleCards);
            restartBtn.addEventListener('click', restart);
            
            // Keyboard events
            document.addEventListener('keydown', function(e) {
                switch(e.code) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        prevCard();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        nextCard();
                        break;
                    case 'Space':
                        e.preventDefault();
                        flipCard();
                        break;
                }
            });
        }
        
        // Start the application
        init();
    </script>
</body>
</html>`;

  // Encode the content for the data URL
  const encodedContent = encodeURIComponent(flashcardContent);

  // Return the iframe-based code that GoHighLevel won't strip
  return `<div style="width: 100%; height: 750px; border: none; border-radius: 8px; overflow: hidden;">
    <iframe 
        src="data:text/html;charset=utf-8,${encodedContent}"
        style="width: 100%; height: 100%; border: none; border-radius: 8px;"
        frameborder="0"
        scrolling="no"
        allowfullscreen>
    </iframe>
</div>`;
};
