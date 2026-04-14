// Poker Vision IoT - Game Logic & AI Integration
let classifier;
let imageModelURL = ''; // User will provide this
let video;
let label = "AGUARDANDO...";
let confidence = 0;
let isModelLoaded = false;

// Game State
let balance = 1000;
let pot = 0;
let currentBet = 0;
let playerHand = [];
let communityCards = [];
let gameActive = false;
let lastActionTime = 0;
const ACTION_COOLDOWN = 2000; // 2 seconds between IA actions

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Mock Antigravity Ecosystem
const antigravity = {
    publish: function(topic, data) {
        console.log(`[IoT Cloud] Publicando em ${topic}:`, data);
        showToast(`AI: ${data.move.toUpperCase()} registrado!`);
        
        // Simular efeito físico de LED
        if (data.move === 'bet') {
            const led = document.getElementById('led-green');
            led.classList.add('active');
            setTimeout(() => led.classList.remove('active'), 1000);
        }
    }
};

// UI Elements
const balanceEl = document.getElementById('balance');
const potEl = document.getElementById('pot-value');
const currentBetEl = document.getElementById('current-bet');
const playerActionIndicator = document.getElementById('player-action-indicator');
const toastContainer = document.getElementById('toast-container');
const setupModal = document.getElementById('setup-modal');
const modelUrlInput = document.getElementById('model-url');
const saveModelBtn = document.getElementById('save-model-btn');
const startBtn = document.getElementById('start-btn');

// --- Initialization ---

saveModelBtn.addEventListener('click', () => {
    imageModelURL = modelUrlInput.value.trim();
    if (imageModelURL) {
        if (!imageModelURL.endsWith('/')) imageModelURL += '/';
        setupModal.classList.add('hidden');
        initGame();
    } else {
        alert("Por favor, insira uma URL válida do Teachable Machine.");
    }
});

function initGame() {
    updateUI();
    startNewRound();
}

async function loadModel() {
    const modelURL = imageModelURL + 'model.json';
    const metadataURL = imageModelURL + 'metadata.json';
    
    try {
        classifier = await tmImage.load(modelURL, metadataURL);
        isModelLoaded = true;
        console.log("Modelo carregado com sucesso!");
    } catch (e) {
        console.error("Erro ao carregar modelo:", e);
        showToast("Erro ao carregar o modelo. Verifique a URL.");
    }
}

// --- p5.js Webcam Functions ---

function setup() {
    const canvasContainer = document.getElementById('video-container');
    const width = canvasContainer.offsetWidth;
    const height = canvasContainer.offsetHeight;
    
    // Create p5 canvas inside the container
    const cnv = createCanvas(width, height);
    cnv.parent('video-container');
    
    // Setup video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    image(video, 0, 0, width, height);
    
    if (isModelLoaded && frameCount % 10 === 0) { // Check every 10 frames
        classifyVideo();
    }
}

async function classifyVideo() {
    const prediction = await classifier.predict(video.elt);
    
    // Sort predictions by probability
    prediction.sort((a, b) => b.probability - a.probability);
    
    label = prediction[0].className;
    confidence = prediction[0].probability;
    
    updateVisionUI();
    handleAIAction(label, confidence);
}

// --- Game Logic ---

function startNewRound() {
    gameActive = true;
    pot = 0;
    currentBet = 0;
    playerHand = [getRandomCard(), getRandomCard()];
    communityCards = [getRandomCard(), getRandomCard(), getRandomCard()];
    
    renderCards();
    updateUI();
    showToast("Nova rodada iniciada!");
}

function getRandomCard() {
    const suitIndex = Math.floor(Math.random() * 4);
    const rankIndex = Math.floor(Math.random() * 13) + 1; // 1 to 13
    return { suit: suitIndex, rank: rankIndex };
}

function handleAIAction(label, confidence) {
    if (!gameActive) return;
    
    const now = Date.now();
    if (now - lastActionTime < ACTION_COOLDOWN) return;

    if (confidence > 0.9) {
        if (label === "Aposta") {
            processBet(10);
            antigravity.publish("poker/mesa1/acao", { player: "User01", move: "bet", value: 10 });
            lastActionTime = now;
        } 
        else if (label === "Desistir") {
            processFold();
            antigravity.publish("poker/mesa1/acao", { player: "User01", move: "fold" });
            lastActionTime = now;
        }
        else if (label === "Passar/Check") {
            processCheck();
            antigravity.publish("poker/mesa1/acao", { player: "User01", move: "check" });
            lastActionTime = now;
        }
    }
}

function processBet(amount) {
    if (balance >= amount) {
        balance -= amount;
        pot += amount;
        currentBet += amount;
        playerActionIndicator.textContent = "APOSTOU $10";
        playerActionIndicator.style.color = "#238636";
        updateUI();
        
        // Auto-next phase after 2 seconds
        setTimeout(() => {
            if (communityCards.length < 5) {
                communityCards.push(getRandomCard());
                renderCards();
                updateUI();
            } else {
                endRound("Você Ganhou!");
            }
        }, 1500);
    }
}

function processFold() {
    playerActionIndicator.textContent = "DESISTIU";
    playerActionIndicator.style.color = "#da3633";
    gameActive = false;
    setTimeout(startNewRound, 3000);
}

function processCheck() {
    playerActionIndicator.textContent = "PASSOU (CHECK)";
    playerActionIndicator.style.color = "#1f6feb";
    
    setTimeout(() => {
        if (communityCards.length < 5) {
            communityCards.push(getRandomCard());
            renderCards();
            updateUI();
        } else {
            endRound("Showdown!");
        }
    }, 1500);
}

function endRound(reason) {
    gameActive = false;
    showToast(`${reason} +$${pot}`);
    balance += pot;
    pot = 0;
    updateUI();
    setTimeout(startNewRound, 4000);
}

// --- UI Rendering ---

function updateUI() {
    balanceEl.textContent = balance;
    potEl.textContent = pot;
    currentBetEl.textContent = currentBet;
}

function updateVisionUI() {
    document.getElementById('label-name').textContent = label.toUpperCase();
    document.getElementById('confidence-value').textContent = Math.round(confidence * 100) + "%";
    document.getElementById('confidence-bar').style.width = (confidence * 100) + "%";
}

function renderCards() {
    const playerArea = document.getElementById('player-cards');
    const communityArea = document.getElementById('community-cards');
    
    playerArea.innerHTML = '';
    communityArea.innerHTML = '';
    
    playerHand.forEach(card => {
        playerArea.appendChild(createCardElement(card));
    });
    
    communityCards.forEach(card => {
        communityArea.appendChild(createCardElement(card));
    });
}

function createCardElement(card) {
    const el = document.createElement('div');
    el.className = 'card';
    
    // Spritesheet math:
    // Background size is 1400% 400% (14 columns, 4 rows)
    // Column 0 is Back, 1 is Ace, 2 is 2...
    // Percentage for column X: X * (100 / (14 - 1)) = X * 7.69%
    // Percentage for row Y: Y * (100 / (4 - 1)) = Y * 33.33%
    
    const posX = card.rank * (100 / 13);
    const posY = card.suit * (100 / 3);
    
    el.style.backgroundPosition = `${posX}% ${posY}%`;
    return el;
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }, 100);
}

// Start Camera trigger
startBtn.addEventListener('click', async () => {
    if (!imageModelURL) {
        setupModal.classList.remove('hidden');
        return;
    }
    
    startBtn.textContent = "CARREGANDO MODELO...";
    startBtn.disabled = true;
    await loadModel();
    startBtn.textContent = "IA ONLINE";
    showToast("Visão Digital Ativada");
});

// Toast CSS Addition (Injected via JS for convenience)
const style = document.createElement('style');
style.textContent = `
    .toast {
        background: rgba(22, 27, 34, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        border-left: 4px solid var(--accent-color);
        margin-bottom: 10px;
        transform: translateX(120%);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .toast.show { transform: translateX(0); }
    #toast-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        display: flex;
        flex-direction: column-reverse;
    }
`;
document.head.appendChild(style);
