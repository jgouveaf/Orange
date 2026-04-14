// Glitch // Override - Core Engine
let player;
let enemies = [];
let projectiles = [];
let platforms = [];
let particles = [];
let gameState = 'START';
let score = 0;
let overrideActive = false;
let overrideEnergy = 0;
const MAX_ENERGY = 100;

// Levels (Simple waypoint based wireframe world)
const WORLD_WIDTH = 5000;
const GRAVITY = 0.6;

// Assets (Placeholder shapes until we generate sprites)
const COLORS = {
    blue: '#00f2ff',
    purple: '#7000ff',
    pink: '#ff007f',
    red: '#ff3131',
    dark: '#050505'
};

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-target');
    
    initLevel();
}

function initLevel() {
    player = new Player(100, height - 200);
    
    // Create platforms
    platforms.push(new Platform(0, height - 100, WORLD_WIDTH, 100)); // Floor
    platforms.push(new Platform(400, height - 250, 200, 20));
    platforms.push(new Platform(700, height - 400, 200, 20));
    platforms.push(new Platform(1000, height - 300, 300, 20, true)); // Glitch platform
    
    // Create enemies
    for(let i=0; i<5; i++) {
        enemies.push(new Enemy(800 + i * 600, height - 150));
    }
}

function draw() {
    background(COLORS.dark);
    
    if (gameState === 'START') {
        renderBackground();
        return;
    }

    if (gameState === 'RUNNING') {
        // Update
        player.update();
        translate(-player.pos.x + width/4, 0); // Camera follow
        
        renderBackground();
        
        // Update & Render Platforms
        platforms.forEach(p => p.show());
        
        // Update & Render Projectiles
        for (let i = projectiles.length - 1; i >= 0; i--) {
            projectiles[i].update();
            projectiles[i].show();
            if (projectiles[i].offscreen()) projectiles.splice(i, 1);
        }
        
        // Update & Render Enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].update();
            enemies[i].show();
            
            // Check collisions
            projectiles.forEach(proj => {
                if (!proj.enemy && dist(proj.pos.x, proj.pos.y, enemies[i].pos.x, enemies[i].pos.y) < 30) {
                    enemies[i].hit();
                    proj.dead = true;
                }
            });
            
            if (enemies[i].dead) {
                spawnParticles(enemies[i].pos.x, enemies[i].pos.y, COLORS.red);
                enemies.splice(i, 1);
                score += 500;
                overrideEnergy = min(MAX_ENERGY, overrideEnergy + 10);
                updateHUD();
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
}

// --- Entity Classes ---

class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.health = 100;
        this.w = 40;
        this.h = 60;
        this.onGround = false;
        this.facing = 1;
        this.shootTimer = 0;
    }

    update() {
        this.vel.y += GRAVITY;
        this.pos.add(this.vel);
        
        // Floor collision
        this.onGround = false;
        platforms.forEach(p => {
            if (p.isGlitch && !overrideActive) return; // Ignore invisible glitch platforms if override not active
            
            if (this.pos.x + this.w/2 > p.x && this.pos.x - this.w/2 < p.x + p.w) {
                if (this.pos.y + this.h/2 > p.y && this.pos.y + this.h/2 < p.y + p.h && this.vel.y >= 0) {
                    this.pos.y = p.y - this.h/2;
                    this.vel.y = 0;
                    this.onGround = true;
                }
            }
        });

        if (this.shootTimer > 0) this.shootTimer--;
        
        if (overrideActive) {
            overrideEnergy -= 0.5;
            if (overrideEnergy <= 0) toggleOverride(false);
            updateHUD();
        }
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        
        // Wireframe body
        noFill();
        stroke(overrideActive ? COLORS.purple : COLORS.blue);
        strokeWeight(2);
        rect(-this.w/2, -this.h/2, this.w, this.h);
        
        // Core glow
        fill(overrideActive ? COLORS.purple : COLORS.blue);
        noStroke();
        ellipse(0, 0, 10, 10);
        
        // Scanline effect on player
        stroke(255, 30);
        for(let i=0; i<this.h; i+=4) line(-this.w/2, -this.h/2 + i, this.w/2, -this.h/2 + i);
        
        pop();
    }

    jump() {
        if (this.onGround) this.vel.y = -15;
    }

    shoot(dir) {
        if (this.shootTimer === 0) {
            projectiles.push(new Projectile(this.pos.x, this.pos.y, dir, false));
            this.shootTimer = 10;
            spawnParticles(this.pos.x + dir.x*20, this.pos.y + dir.y*20, COLORS.blue);
        }
    }
}

class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.health = 20;
        this.dead = false;
        this.w = 40;
        this.h = 60;
    }

    hit() {
        this.health -= 10;
        if (this.health <= 0) this.dead = true;
    }

    update() {
        // Simple hover AI
        this.pos.y += sin(frameCount * 0.1) * 2;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(COLORS.red);
        strokeWeight(2);
        noFill();
        // Cyber humanoid shape
        rect(-20, -30, 40, 60);
        rect(-10, -20, 20, 20); // Eye
        pop();
    }
}

class Platform {
    constructor(x, y, w, h, isGlitch = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isGlitch = isGlitch;
    }

    show() {
        if (this.isGlitch && !overrideActive) {
            // Faint pulse if near?
            return;
        }
        
        stroke(this.isGlitch ? COLORS.purple : COLORS.blue);
        strokeWeight(1);
        noFill();
        rect(this.x, this.y, this.w, this.h);
        
        // Detailed wireframe
        for(let i=0; i<this.w; i+=40) line(this.x + i, this.y, this.x + i, this.y + this.h);
    }
}

class Projectile {
    constructor(x, y, dir, enemy) {
        this.pos = createVector(x, y);
        this.vel = dir.mult(15);
        this.enemy = enemy;
        this.dead = false;
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        stroke(this.enemy ? COLORS.red : COLORS.blue);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

    offscreen() {
        return (this.pos.x < 0 || this.pos.x > WORLD_WIDTH || this.dead);
    }
}

// --- Input & Helpers ---

function handleInput() {
    if (keyIsDown(65)) player.pos.x -= 7; // A
    if (keyIsDown(68)) player.pos.x += 7; // D
    if (keyIsDown(74)) { // J - Shoot
        let dir = createVector(1, 0);
        if (keyIsDown(87)) dir.y = -1; // W
        if (keyIsDown(83)) dir.y = 1;  // S
        if (keyIsDown(65)) dir.x = -1;
        player.shoot(dir);
    }
}

function keyPressed() {
    if (gameState === 'START' && keyCode === ENTER) {
        gameState = 'RUNNING';
        document.getElementById('start-screen').classList.add('hidden');
    }
    
    if (keyCode === 75) player.jump(); // K
    if (keyCode === 32) toggleOverride(!overrideActive); // SPACE
}

function toggleOverride(active) {
    if (active && overrideEnergy < 20) return;
    overrideActive = active;
    if (active) {
        addLog("PROTOCOL OVERRIDE: ACTIVE");
        // Bullet time effect (slow down physics?)
        frameRate(30); 
    } else {
        addLog("OVERRIDE: DISCONNECTED");
        frameRate(60);
    }
}

function updateHUD() {
    document.getElementById('energy-bar').style.width = overrideEnergy + '%';
    document.getElementById('score-display').textContent = score.toString().padStart(6, '0');
}

function renderBackground() {
    // Parallax Wireframes
    stroke(COLORS.blue);
    strokeWeight(0.5);
    opacity = 50;
    
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
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(2, 5));
        this.lifespan = 255;
        this.col = col;
    }
    update() {
        this.pos.add(this.vel);
        this.lifespan -= 10;
    }
    show() {
        stroke(this.col);
        strokeWeight(2);
        point(this.pos.x, this.pos.y);
    }
    finished() { return this.lifespan < 0; }
}

function addLog(msg) {
    const log = document.getElementById('log-content');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `> ${msg}`;
    log.prepend(entry);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
