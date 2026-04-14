// PO2 - Game Logic (No AI Version)
let balance = 1000;
let pot = 0;
let playerHand = [];
let communityCards = [];
let activeGoldEffect = null;
let activeEmeraldEffect = null;
let isShieldActive = false;
let isSafeActive = false;

// Mock rivals for "King of Gold" effect
const OTHER_PLAYERS_COUNT = 3;

// UI Elements
const balanceEl = document.getElementById('balance');
const potEl = document.getElementById('pot-value');
const playerArea = document.getElementById('player-cards');
const communityArea = document.getElementById('community-cards');
const logPanel = document.getElementById('action-log');
const tutorialModal = document.getElementById('tutorial-modal');
const closeTutorialBtn = document.getElementById('close-tutorial');

// --- Initialization ---

window.addEventListener('load', () => {
    // Show tutorial on first load
    if (!localStorage.getItem('po2_tutorial_seen')) {
        tutorialModal.classList.remove('hidden');
    } else {
        tutorialModal.classList.add('hidden');
    }
    initGame();
});

closeTutorialBtn.addEventListener('click', () => {
    tutorialModal.classList.add('hidden');
    localStorage.setItem('po2_tutorial_seen', 'true');
});

function initGame() {
    startNewRound();
    updateUI();
}

// --- Poker Actions ---

document.getElementById('check-btn').addEventListener('click', () => {
    addLog("Você passou (Check).");
    if (communityCards.length < 5) {
        dealCommunity(1);
    } else {
        endRound(Math.random() > 0.4 ? "VENCER" : "PERDER");
    }
});

document.getElementById('bet-btn').addEventListener('click', () => {
    let betAmount = 10;
    
    // Apply "Poison" if rival (simulated) forced double
    if (activeEmeraldEffect === 'emerald_king') {
        betAmount *= 2;
        addLog("☣️ VENENO: Aposta dobrada para $20!");
        activeEmeraldEffect = null;
    }

    if (balance >= betAmount) {
        balance -= betAmount;
        pot += betAmount;
        addLog(`Você apostou $${betAmount}.`);
        updateUI();
        
        setTimeout(() => {
            if (communityCards.length < 5) {
                dealCommunity(1);
            } else {
                endRound(Math.random() > 0.4 ? "VENCER" : "PERDER");
            }
        }, 500);
    }
});

document.getElementById('fold-btn').addEventListener('click', () => {
    addLog("Você desistiu (Fold).");
    startNewRound();
});

// --- Special Deck Mechanics ---

function playSpecial(type) {
    if (activeEmeraldEffect === 'emerald_ace' && type.startsWith('gold_')) {
        addLog("🚫 PORTAL: Efeito de Ouro cancelado por Esmeralda!");
        return;
    }

    switch(type) {
        // GOLD DECK
        case 'gold_jack': // The Collector
            balance += 5;
            addLog("🟡 COLETOR: +5 fichas adicionadas via Antigravity.");
            break;
        case 'gold_queen': // The Shield
            isShieldActive = true;
            addLog("🟡 ESCUDO: Ativado. -50% prejuízo se perder.");
            break;
        case 'gold_king': // The Tax
            let tax = OTHER_PLAYERS_COUNT * 2;
            balance += tax;
            addLog(`🟡 IMPOSTO: Recebeu $${tax} dos outros jogadores.`);
            break;
        case 'gold_ace': // The Safe
            isSafeActive = true;
            addLog("🟡 COFRE: Invencível contra ataques de Esmeralda!");
            break;

        // EMERALD DECK
        case 'emerald_jack': // The Spy
            if (isSafeActive) {
                addLog("🛡️ COFRE: Bloqueou o Espião!");
                isSafeActive = false;
            } else {
                let highest = getHighestRank(communityCards);
                addLog(`🟢 ESPIÃO: A maior carta na mesa é ${highest}.`);
            }
            break;
        case 'emerald_queen': // The Illusion
            if (playerHand.length > 0) {
                playerHand[0] = { rank: Math.floor(Math.random()*10), suit: Math.floor(Math.random()*4) };
                renderCards();
                addLog("🟢 ILUSÃO: Uma de suas cartas foi trocada.");
            }
            break;
        case 'emerald_king': // The Poison
            activeEmeraldEffect = 'emerald_king';
            addLog("🟢 VENENO: Lançado! Próxima aposta será 2x.");
            break;
        case 'emerald_ace': // The Portal
            isSafeActive = false;
            isShieldActive = false;
            addLog("🟢 PORTAL: Todos os efeitos de Ouro anulados!");
            break;
    }
    updateUI();
}

// --- Core Helper Functions ---

function startNewRound() {
    pot = 0;
    isShieldActive = false;
    isSafeActive = false;
    activeEmeraldEffect = null;
    
    playerHand = [getRandomCard(), getRandomCard()];
    communityCards = [getRandomCard(), getRandomCard(), getRandomCard()];
    
    renderCards();
    updateUI();
    addLog("--- Nova Rodada ---");
}

function dealCommunity(count) {
    for(let i=0; i<count; i++) communityCards.push(getRandomCard());
    renderCards();
    updateUI();
}

function getRandomCard() {
    return { rank: Math.floor(Math.random() * 13), suit: Math.floor(Math.random() * 4) };
}

function getHighestRank(cards) {
    if (cards.length === 0) return "Nenhuma";
    const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let max = -1;
    cards.forEach(c => { if(c.rank > max) max = c.rank; });
    return ranks[max];
}

function endRound(result) {
    if (result === "VENCER") {
        let win = pot * 1.5;
        balance += win;
        showToast(`VOCÊ VENCEU! +$${Math.floor(win)}`);
        addLog(`Vitória! Pot de $${pot} recolhido.`);
    } else {
        if (isShieldActive) {
            let refund = pot / 2;
            balance += refund;
            addLog("🟡 ESCUDO: Reembolsou metade da perda!");
        }
        showToast("VOCÊ PERDEU!");
        addLog("Derrota no Showdown.");
    }
    
    setTimeout(startNewRound, 3000);
}

function renderCards() {
    playerArea.innerHTML = '';
    communityArea.innerHTML = '';
    
    playerHand.forEach(card => playerArea.appendChild(createCardUI(card)));
    communityCards.forEach(card => communityArea.appendChild(createCardUI(card)));
}

function createCardUI(card) {
    const el = document.createElement('div');
    el.className = 'card';
    
    // Using simple mapping for the sprite positions
    // This can be refined based on the exact image geometry
    const x = (card.rank % 5) * 20; 
    const y = (card.suit % 4) * 25;
    
    el.style.backgroundPosition = `${x}% ${y}%`;
    return el;
}

function addLog(msg) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logPanel.prepend(entry);
}

function updateUI() {
    balanceEl.textContent = balance;
    potEl.textContent = pot;
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.background = 'rgba(255,255,255,0.9)';
    toast.style.color = '#000';
    toast.style.padding = '20px 40px';
    toast.style.borderRadius = '40px';
    toast.style.fontWeight = '900';
    toast.style.fontSize = '2rem';
    toast.style.zIndex = '2000';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}
