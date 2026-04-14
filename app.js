// Glitch // Override - Expanded Engine 7 Levels & Boss
let player;
let enemies = [];
let projectiles = [];
let platforms = [];
let particles = [];
let boss = null;
let currentLevel = 1;
let gameState = 'START'; // START, RUNNING, SHOP, GAMEOVER, WIN
let score = 0;
let overrideActive = false;
let overrideEnergy = 0;
const MAX_ENERGY = 100;

// Upgrades
let fireRate = 10;
let moveSpeed = 7;
let maxHealth = 100;
let jumpForce = 15;

const WORLD_WIDTH = 5000;
const GRAVITY = 0.6;
const COLORS = {
    blue: '#00f2ff',
    purple: '#7000ff',
    pink: '#ff007f',
    red: '#ff3131',
    dark: '#050505'
};

// Sprites (User must save images as assets/player.png, assets/enemy.png, assets/world.png, assets/boss.png)
let sprPlayer, sprEnemy, sprWorld, sprBoss;

function preload() {
    // sprPlayer = loadImage('assets/player.png');
    // sprEnemy = loadImage('assets/enemy.png');
    // sprWorld = loadImage('assets/world.png');
    // sprBoss = loadImage('assets/boss.png');
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-target');
    initGame();
}

function initGame() {
    score = 0;
    currentLevel = 1;
    overrideEnergy = 20;
    setupLevel(currentLevel);
}

function setupLevel(lvl) {
    enemies = [];
    projectiles = [];
    platforms = [];
    particles = [];
    boss = null;
    
    // Procedural/Pattern Level Generation
    if (lvl < 7) {
        platforms.push(new Platform(0, height - 100, WORLD_WIDTH, 100)); // Floor
        for(let i=0; i<15; i++) {
            let px = 500 + i * 400;
            let py = height - 150 - random(200);
            platforms.push(new Platform(px, py, 200, 20, random() > 0.8));
            if (random() > 0.4) enemies.push(new Enemy(px + 50, py - 60));
        }
        // Goal at end
        platforms.push(new Platform(WORLD_WIDTH - 200, height - 400, 100, 10, false, true));
    } else {
        // Level 7: Boss Room
        platforms.push(new Platform(0, height - 100, width, 100));
        boss = new FinalBoss(width * 0.7, height / 2);
    }
    
    player = new Player(100, height - 200);
    gameState = 'RUNNING';
}

function draw() {
    background(COLORS.dark);
    
    if (gameState === 'START') {
        renderBackground();
        return;
    }

    if (gameState === 'SHOP') {
        renderShop();
        return;
    }

    if (gameState === 'RUNNING') {
        updateGame();
    }
    
    if (gameState === 'WIN') {
        renderWin();
    }
}

function updateGame() {
    player.update();
    
    // Camera follow
    let targetX = -player.pos.x + width/4;
    if (currentLevel === 7) targetX = 0; // Fixed camera for boss
    translate(targetX, 0);
    
    renderBackground();
    
    platforms.forEach(p => {
        p.show();
        if (p.isGoal && dist(player.pos.x, player.pos.y, p.x, p.y) < 50) {
            nextLevel();
        }
    });
    
    // Projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].show();
        
        // Enemy collision
        enemies.forEach(en => {
            if (!projectiles[i].enemy && dist(projectiles[i].pos.x, projectiles[i].pos.y, en.pos.x, en.pos.y) < 30) {
                en.hit();
                projectiles[i].dead = true;
            }
        });
        
        // Boss collision
        if (boss && !projectiles[i].enemy && boss.checkHit(projectiles[i].pos)) {
            projectiles[i].dead = true;
        }

        // Player collision
        if (projectiles[i].enemy && dist(projectiles[i].pos.x, projectiles[i].pos.y, player.pos.x, player.pos.y) < 30) {
            player.hit();
            projectiles[i].dead = true;
        }

        if (projectiles[i].offscreen()) projectiles.splice(i, 1);
    }
    
    // Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        enemies[i].show();
        if (enemies[i].dead) {
            spawnParticles(enemies[i].pos.x, enemies[i].pos.y, COLORS.red);
            enemies.splice(i, 1);
            score += 100;
            overrideEnergy = min(MAX_ENERGY, overrideEnergy + 5);
        }
    }

    // Boss
    if (boss) {
        boss.update();
        boss.show();
        if (boss.dead) {
            gameState = 'WIN';
        }
    }
    
    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) particles.splice(i, 1);
    }
    
    player.show();
    handleInput();
}

// --- Next Level & Shop ---

function nextLevel() {
    if (currentLevel < 7) {
        gameState = 'SHOP';
    } else {
        gameState = 'WIN';
    }
}

function buyUpgrade(type) {
    if (type === 'fire') fireRate = max(3, fireRate - 2);
    if (type === 'speed') moveSpeed += 2;
    if (type === 'jump') jumpForce += 2;
    if (type === 'health') { maxHealth += 50; player.health = maxHealth; }
    
    currentLevel++;
    setupLevel(currentLevel);
}

// --- Classes ---

class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.health = maxHealth;
        this.w = 40; this.h = 60;
        this.shootTimer = 0;
        this.onGround = false;
    }
    update() {
        this.vel.y += GRAVITY;
        this.pos.add(this.vel);
        this.onGround = false;
        platforms.forEach(p => {
            if (p.isGlitch && !overrideActive) return;
            if (this.pos.x + 20 > p.x && this.pos.x - 20 < p.x + p.w) {
                if (this.pos.y + 30 > p.y && this.pos.y + 30 < p.y + p.h && this.vel.y >= 0) {
                    this.pos.y = p.y - 30; this.vel.y = 0; this.onGround = true;
                }
            }
        });
        if (this.shootTimer > 0) this.shootTimer--;
        if (overrideActive) {
            overrideEnergy -= 0.5;
            if (overrideEnergy <= 0) toggleOverride(false);
        }
        updateHUD();
    }
    show() {
        push(); translate(this.pos.x, this.pos.y);
        noFill(); stroke(overrideActive ? COLORS.purple : COLORS.blue);
        rect(-20, -30, 40, 60); // Wireframe body
        // Glitch trail if moving
        if (abs(this.vel.x) > 1) {
            stroke(COLORS.blue, 50);
            rect(-40, -30, 40, 60);
        }
        pop();
    }
    hit() {
        this.health -= 10;
        spawnParticles(this.pos.x, this.pos.y, COLORS.blue);
        if (this.health <= 0) gameState = 'GAMEOVER';
    }
    shoot(dir) {
        if (this.shootTimer === 0) {
            projectiles.push(new Projectile(this.pos.x, this.pos.y, dir, false));
            this.shootTimer = fireRate;
        }
    }
}

class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.health = 20; this.dead = false;
        this.timer = 0;
    }
    update() {
        this.timer++;
        if (this.timer % 60 === 0 && dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 600) {
            let dir = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y).normalize();
            projectiles.push(new Projectile(this.pos.x, this.pos.y, dir, true));
        }
    }
    show() {
        push(); translate(this.pos.x, this.pos.y);
        stroke(COLORS.red); noFill();
        rect(-20, -30, 40, 60);
        fill(COLORS.red); ellipse(0, -20, 10, 10); // Red camera head
        pop();
    }
    hit() { this.health -= 10; if (this.health <= 0) this.dead = true; }
}

class FinalBoss {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.health = 500;
        this.state = 'IDLE';
        this.timer = 0;
        this.dead = false;
    }
    update() {
        this.timer++;
        if (this.timer % 200 === 0) {
            this.state = random(['BEAM', 'HANDS', 'IDLE']);
        }
        if (this.state === 'BEAM' && this.timer % 30 === 0) {
            projectiles.push(new Projectile(this.pos.x, this.pos.y, createVector(-1, 0), true));
        }
    }
    show() {
        push(); translate(this.pos.x, this.pos.y);
        stroke(this.state === 'BEAM' ? COLORS.red : COLORS.purple);
        strokeWeight(4); noFill();
        // Octahedron shape
        beginShape();
        vertex(0, -100); vertex(80, 0); vertex(0, 100); vertex(-80, 0); vertex(0, -100);
        endShape();
        line(-80, 0, 80, 0);
        pop();
        
        // Boss Health Bar
        fill(COLORS.red);
        rect(width/2 - 250, 50, map(this.health, 0, 500, 0, 500), 10);
    }
    checkHit(pos) {
        if (dist(pos.x, pos.y, this.pos.x, this.pos.y) < 100) {
            this.health -= 5;
            if (this.health <= 0) this.dead = true;
            return true;
        }
        return false;
    }
}

class Platform {
    constructor(x, y, w, h, isGlitch = false, isGoal = false) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.isGlitch = isGlitch; this.isGoal = isGoal;
    }
    show() {
        if (this.isGlitch && !overrideActive) return;
        stroke(this.isGoal ? COLORS.blue : (this.isGlitch ? COLORS.purple : COLORS.blue));
        if (this.isGoal) strokeWeight(4);
        noFill(); rect(this.x, this.y, this.w, this.h);
        strokeWeight(1);
    }
}

class Projectile {
    constructor(x, y, dir, enemy) {
        this.pos = createVector(x, y);
        this.vel = dir.copy().mult(15);
        this.enemy = enemy; this.dead = false;
    }
    update() { this.pos.add(this.vel); }
    show() {
        stroke(this.enemy ? COLORS.red : COLORS.blue);
        strokeWeight(4); point(this.pos.x, this.pos.y);
    }
    offscreen() { return (this.pos.x < 0 || this.pos.x > WORLD_WIDTH || this.dead); }
}

// --- UI Rendering ---

function renderShop() {
    textAlign(CENTER);
    fill(COLORS.blue); textSize(40);
    text(`LEVEL ${currentLevel} CLEARED`, width/2, height/4);
    textSize(20);
    text("SELECT ONE UPGRADE CODE:", width/2, height/3);
    
    let options = [
        { name: "[F] CORE_OVERCLOCK (FIRE RATE)", type: 'fire' },
        { name: "[S] KINETIC_OPTIMIZER (SPEED)", type: 'speed' },
        { name: "[J] VECTOR_THRUST (JUMP)", type: 'jump' },
        { name: "[H] REPAIR_SUBROUTINE (HEALTH)", type: 'health' }
    ];
    
    options.forEach((opt, i) => {
        fill(255);
        rect(width/2 - 200, height/2 + i*60, 400, 40);
        fill(0);
        text(opt.name, width/2, height/2 + i*60 + 25);
    });
}

function handleInput() {
    if (gameState !== 'RUNNING') return;
    if (keyIsDown(65)) player.pos.x -= moveSpeed; // A
    if (keyIsDown(68)) player.pos.x += moveSpeed; // D
    if (keyIsDown(74)) { // J
        let dir = createVector(1, 0);
        if (keyIsDown(87)) dir.y = -1;
        if (keyIsDown(83)) dir.y = 1;
        if (keyIsDown(65)) dir.x = -1;
        player.shoot(dir);
    }
}

function keyPressed() {
    if (gameState === 'START' && keyCode === ENTER) {
        gameState = 'RUNNING';
        document.getElementById('start-screen').classList.add('hidden');
    }
    if (gameState === 'SHOP') {
        if (key === 'f') buyUpgrade('fire');
        if (key === 's') buyUpgrade('speed');
        if (key === 'j') buyUpgrade('jump');
        if (key === 'h') buyUpgrade('health');
    }
    if (keyCode === 75) player.jump(); // K
    if (keyCode === 32) toggleOverride(!overrideActive); // SPACE
}

function toggleOverride(active) {
    if (active && overrideEnergy < 20) return;
    overrideActive = active;
    frameRate(active ? 30 : 60);
}

function updateHUD() {
    document.getElementById('energy-bar').style.width = overrideEnergy + '%';
    document.getElementById('health-bar').style.width = (player.health / maxHealth * 100) + '%';
    document.getElementById('score-display').textContent = score.toString().padStart(6, '0');
    document.getElementById('level-num').textContent = `${currentLevel.toString().padStart(2, '0')} / 07`;
    addLog(`LAYER: ${currentLevel} | SYNC: ${Math.floor(player.health)}%`);
}

function renderBackground() {
    stroke(COLORS.blue, 20);
    for(let i=0; i<10; i++) {
        let x = (i * 800 - player.pos.x * 0.2) % WORLD_WIDTH;
        line(x, 0, x, height);
    }
}

function spawnParticles(x, y, col) {
    for(let i=0; i<10; i++) particles.push(new Particle(x, y, col));
}

class Particle {
    constructor(x, y, col) {
        this.pos = createVector(x, y); this.vel = p5.Vector.random2D().mult(random(2, 5));
        this.lifespan = 255; this.col = col;
    }
    update() { this.pos.add(this.vel); this.lifespan -= 10; }
    show() { stroke(this.col, this.lifespan); strokeWeight(2); point(this.pos.x, this.pos.y); }
    finished() { return this.lifespan < 0; }
}

function addLog(msg) {
    const log = document.getElementById('log-content');
    if (log.childNodes.length > 5) log.removeChild(log.lastChild);
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `> ${msg}`;
    log.prepend(entry);
}
