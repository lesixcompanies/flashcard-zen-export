
export const generateCreatorExportCode = (): string => {
  const flashcardCreatorHtml = `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Flashcard Creator & Export System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
            overflow-y: auto;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            color: #374151;
            font-size: 1.5rem;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #374151;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #4f46e5;
        }
        
        .btn {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
        }
        
        .btn-danger {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        
        .card-item {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
        }
        
        .card-item h3 {
            color: #374151;
            margin-bottom: 10px;
        }
        
        .card-item p {
            color: #6b7280;
            margin-bottom: 15px;
        }
        
        .preview-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 24px;
            margin: 20px 0;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s;
        }
        
        .preview-card:hover {
            transform: scale(1.02);
        }
        
        .preview-card.flipped .card-front {
            display: none;
        }
        
        .preview-card.flipped .card-back {
            display: block;
        }
        
        .card-back {
            display: none;
        }
        
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }
        
        @media (max-width: 768px) {
            .two-column {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
        }
        
        .cards-container {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
        }
        
        .export-result {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            display: none;
        }
        
        .export-code {
            background: #1f2937;
            color: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 300px;
            overflow-y: auto;
            margin: 10px 0;
        }
        
        .file-input {
            display: none;
        }
        
        .alert {
            padding: 12px;
            border-radius: 8px;
            margin: 10px 0;
            font-weight: 500;
        }
        
        .alert-success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        
        .alert-error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✨ Flashcard Creator & Export System</h1>
            <p>Create, customize, and export your study flashcards</p>
        </div>
        
        <div class='content'>
            <div class='two-column'>
                <div>
                    <div class='section'>
                        <h2>📝 Create Flashcard</h2>
                        <div class='form-group'>
                            <label for='frontText'>Front Text:</label>
                            <textarea id='frontText' rows='3' placeholder='Enter the question or prompt...'></textarea>
                        </div>
                        <div class='form-group'>
                            <label for='backText'>Back Text:</label>
                            <textarea id='backText' rows='3' placeholder='Enter the answer or explanation...'></textarea>
                        </div>
                        <button class='btn' onclick='addCard()'>Add Card</button>
                        <input type='file' id='csvFileInput' class='file-input' accept='.csv,.txt' onchange='handleFileImport(event)'>
                        <button class='btn btn-secondary' onclick='triggerFileImport()'>Upload CSV File</button>
                        <div id='importAlert' style='display: none;'></div>
                    </div>
                    
                    <div class='section'>
                        <h2>🎨 Customize Style</h2>
                        <div class='form-group'>
                            <label for='bgColor'>Background Color:</label>
                            <select id='bgColor' onchange='updatePreview()'>
                                <option value='bg-white'>White</option>
                                <option value='bg-blue-50'>Light Blue</option>
                                <option value='bg-green-50'>Light Green</option>
                                <option value='bg-purple-50'>Light Purple</option>
                                <option value='bg-yellow-50'>Light Yellow</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label for='textColor'>Text Color:</label>
                            <select id='textColor' onchange='updatePreview()'>
                                <option value='text-gray-800'>Dark Gray</option>
                                <option value='text-blue-800'>Blue</option>
                                <option value='text-green-800'>Green</option>
                                <option value='text-purple-800'>Purple</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label for='fontSize'>Font Size:</label>
                            <select id='fontSize' onchange='updatePreview()'>
                                <option value='text-base'>Normal</option>
                                <option value='text-lg'>Large</option>
                                <option value='text-xl'>Extra Large</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class='section'>
                        <h2>👀 Preview</h2>
                        <div id='previewCard' class='preview-card' onclick='flipPreviewCard()'>
                            <div class='card-front'>
                                <h3>Click Add Card to see preview</h3>
                                <p>Front side will appear here</p>
                            </div>
                            <div class='card-back'>
                                <h3>Back Side</h3>
                                <p>Answer will appear here</p>
                            </div>
                        </div>
                        <p style='text-align: center; color: #6b7280;'>Click the card to flip it</p>
                    </div>
                </div>
            </div>
            
            <div class='section'>
                <h2>📚 Your Cards</h2>
                <div id='cardsList' class='cards-container'>
                    <p style='text-align: center; color: #6b7280;'>No cards created yet. Add your first card above!</p>
                </div>
            </div>
            
            <div class='section'>
                <h2>🚀 Export Study Interface</h2>
                <p style='margin-bottom: 15px; color: #6b7280;'>Generate a complete study interface with all your cards:</p>
                <button id='exportBtn' class='btn' onclick='generateExportCode()'>Generate Export Code</button>
                <div id='exportResult' class='export-result'>
                    <h3>Your Export Code:</h3>
                    <div id='exportCode' class='export-code'></div>
                    <button class='btn btn-secondary' onclick='copyExportCode()'>Copy Code</button>
                    <div id='copyAlert' style='display: none;'></div>
                    <p style='margin-top: 10px; font-size: 14px; color: #6b7280;'>
                        Copy this code and paste it into your website or learning platform.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let cards = [];
        let currentPreviewIndex = 0;
        
        function addCard() {
            const frontText = document.getElementById('frontText').value.trim();
            const backText = document.getElementById('backText').value.trim();
            
            if (!frontText || !backText) {
                showAlert('importAlert', 'Please fill in both front and back text.', 'error');
                return;
            }
            
            cards.push({
                front: frontText,
                back: backText,
                id: Date.now()
            });
            
            document.getElementById('frontText').value = '';
            document.getElementById('backText').value = '';
            
            updateCardsList();
            updatePreview();
            showAlert('importAlert', 'Card added successfully!', 'success');
        }
        
        function triggerFileImport() {
            document.getElementById('csvFileInput').click();
        }
        
        function handleFileImport(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                parseCSVContent(content);
            };
            reader.readAsText(file);
        }
        
        function parseCSVContent(content) {
            const lines = content.split('\\n').filter(line => line.trim());
            let imported = 0;
            let hasHeader = false;
            
            // Check if first line might be a header
            if (lines.length > 0) {
                const firstLine = lines[0].toLowerCase();
                if (firstLine.includes('front') || firstLine.includes('question') || 
                    firstLine.includes('term') || firstLine.includes('back') || 
                    firstLine.includes('answer') || firstLine.includes('definition')) {
                    hasHeader = true;
                }
            }
            
            const startIndex = hasHeader ? 1 : 0;
            
            for (let i = startIndex; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                // Support both comma and pipe separation
                let parts;
                if (line.includes('|')) {
                    parts = line.split('|');
                } else if (line.includes(',')) {
                    // Simple CSV parsing - handles basic cases
                    parts = parseCSVLine(line);
                } else {
                    continue;
                }
                
                if (parts.length >= 2) {
                    cards.push({
                        front: parts[0].trim(),
                        back: parts[1].trim(),
                        id: Date.now() + imported
                    });
                    imported++;
                }
            }
            
            if (imported > 0) {
                updateCardsList();
                updatePreview();
                showAlert('importAlert', 'Imported ' + imported + ' cards successfully!', 'success');
            } else {
                showAlert('importAlert', 'No valid cards found. Please check your file format.', 'error');
            }
            
            // Clear file input
            document.getElementById('csvFileInput').value = '';
        }
        
        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            
            result.push(current);
            return result.map(item => item.replace(/^"|"$/g, ''));
        }
        
        function showAlert(containerId, message, type) {
            const container = document.getElementById(containerId);
            container.className = 'alert alert-' + type;
            container.textContent = message;
            container.style.display = 'block';
            
            setTimeout(function() {
                container.style.display = 'none';
            }, 5000);
        }
        
        function deleteCard(id) {
            cards = cards.filter(card => card.id !== id);
            updateCardsList();
            updatePreview();
        }
        
        function editCard(id) {
            const card = cards.find(c => c.id === id);
            if (!card) return;
            
            const newFront = prompt('Edit front text:', card.front);
            if (newFront === null) return;
            
            const newBack = prompt('Edit back text:', card.back);
            if (newBack === null) return;
            
            card.front = newFront.trim();
            card.back = newBack.trim();
            
            updateCardsList();
            updatePreview();
        }
        
        function updateCardsList() {
            const container = document.getElementById('cardsList');
            
            if (cards.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #6b7280;">No cards created yet. Add your first card above!</p>';
                return;
            }
            
            container.innerHTML = cards.map(card => 
                '<div class="card-item">' +
                    '<h3>' + escapeHtml(card.front) + '</h3>' +
                    '<p>' + escapeHtml(card.back) + '</p>' +
                    '<button class="btn btn-secondary" onclick="editCard(' + card.id + ')">Edit</button>' +
                    '<button class="btn btn-danger" onclick="deleteCard(' + card.id + ')">Delete</button>' +
                '</div>'
            ).join('');
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function updatePreview() {
            if (cards.length === 0) return;
            
            const card = cards[currentPreviewIndex] || cards[0];
            const bgColor = document.getElementById('bgColor').value;
            const textColor = document.getElementById('textColor').value;
            const fontSize = document.getElementById('fontSize').value;
            
            const previewCard = document.getElementById('previewCard');
            previewCard.className = 'preview-card ' + bgColor + ' ' + textColor + ' ' + fontSize;
            
            previewCard.querySelector('.card-front h3').textContent = card.front;
            previewCard.querySelector('.card-back h3').textContent = card.back;
        }
        
        function flipPreviewCard() {
            const previewCard = document.getElementById('previewCard');
            previewCard.classList.toggle('flipped');
        }
        
        function generateExportCode() {
            if (cards.length === 0) {
                showAlert('copyAlert', 'Please add some cards first!', 'error');
                return;
            }
            
            document.getElementById('exportBtn').textContent = 'Generating...';
            
            const bgColor = document.getElementById('bgColor').value;
            const textColor = document.getElementById('textColor').value;
            const fontSize = document.getElementById('fontSize').value;
            
            const flashcardHtml = generateFlashcardHtml(cards, bgColor, textColor, fontSize);
            const encodedContent = encodeURIComponent(flashcardHtml);
            const exportCode = '<div style="width: 100%; height: 750px; border: none; border-radius: 8px; overflow: hidden;"><iframe src="data:text/html;charset=utf-8,' + encodedContent + '" style="width: 100%; height: 100%; border: none; border-radius: 8px;" frameborder="0" scrolling="no" allowfullscreen></iframe></div>';
            
            document.getElementById('exportCode').textContent = exportCode;
            document.getElementById('exportResult').style.display = 'block';
            document.getElementById('exportBtn').textContent = 'Generate Export Code';
        }
        
        function generateFlashcardHtml(cardsData, bgColor, textColor, fontSize) {
            const cardsJson = JSON.stringify(cardsData).replace(/</g, '\\\\u003c').replace(/>/g, '\\\\u003e');
            
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Study Flashcards</title><style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; } .container { max-width: 800px; margin: 0 auto; } .header { text-align: center; color: white; margin-bottom: 30px; } .header h1 { font-size: 2.5rem; margin-bottom: 10px; } .flashcard { background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); min-height: 300px; display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: transform 0.3s; margin-bottom: 20px; padding: 40px; } .flashcard:hover { transform: scale(1.02); } .flashcard.flipped .front { display: none; } .flashcard.flipped .back { display: block; } .back { display: none; } .controls { text-align: center; margin: 20px 0; } .btn { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; margin: 0 5px; cursor: pointer; font-weight: 600; } .btn:hover { transform: translateY(-2px); } .progress { color: white; font-size: 18px; margin-top: 15px; } </style></head><body><div class="container"><div class="header"><h1>📚 Study Time</h1><p>Click cards to flip • Use buttons to navigate</p></div><div id="flashcard" class="flashcard ' + bgColor + ' ' + textColor + ' ' + fontSize + '" onclick="flipCard()"><div class="front"><h2 id="frontText"></h2></div><div class="back"><h2 id="backText"></h2></div></div><div class="controls"><button class="btn" onclick="previousCard()">← Previous</button><button class="btn" onclick="nextCard()">Next →</button><button class="btn" onclick="shuffleCards()">🔀 Shuffle</button></div><div class="progress"><span id="progress">Card 1 of ' + cardsData.length + '</span></div></div><script>const cards = ' + cardsJson + '; let currentCard = 0; let isFlipped = false; function showCard() { document.getElementById("frontText").textContent = cards[currentCard].front; document.getElementById("backText").textContent = cards[currentCard].back; document.getElementById("progress").textContent = "Card " + (currentCard + 1) + " of " + cards.length; document.getElementById("flashcard").classList.remove("flipped"); isFlipped = false; } function flipCard() { document.getElementById("flashcard").classList.toggle("flipped"); isFlipped = !isFlipped; } function nextCard() { currentCard = (currentCard + 1) % cards.length; showCard(); } function previousCard() { currentCard = currentCard === 0 ? cards.length - 1 : currentCard - 1; showCard(); } function shuffleCards() { for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; } currentCard = 0; showCard(); } showCard();</script></body></html>';
        }
        
        function copyExportCode() {
            const code = document.getElementById('exportCode').textContent;
            
            if (!code) {
                showAlert('copyAlert', 'No code to copy. Please generate export code first.', 'error');
                return;
            }
            
            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code).then(function() {
                    showAlert('copyAlert', 'Code copied to clipboard successfully!', 'success');
                }).catch(function(err) {
                    fallbackCopyTextToClipboard(code);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(code);
            }
        }
        
        function fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showAlert('copyAlert', 'Code copied to clipboard successfully!', 'success');
                } else {
                    showAlert('copyAlert', 'Failed to copy code. Please select and copy manually.', 'error');
                }
            } catch (err) {
                showAlert('copyAlert', 'Copy not supported. Please select and copy manually.', 'error');
            }
            
            document.body.removeChild(textArea);
        }
        
        updateCardsList();
    </script>
</body>
</html>`;

  const encodedContent = encodeURIComponent(flashcardCreatorHtml);

  return `<div style="width: 100%; height: 1500px; border: none; border-radius: 8px; overflow: hidden;">
    <iframe 
        src="data:text/html;charset=utf-8,${encodedContent}"
        style="width: 100%; height: 100%; border: none; border-radius: 8px;"
        frameborder="0"
        scrolling="yes"
        allowfullscreen>
    </iframe>
</div>`;
};
