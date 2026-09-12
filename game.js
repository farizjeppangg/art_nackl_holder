let gameData = {
    score: 0,
    pps: 1,
    dragonLevel: 1,
    energy: 100,
    multiplier: 1
};

// Inisialisasi Telegram WebApp SDK
let tg = window.Telegram.WebApp;
if (tg) {
    tg.expand();
}

// Fungsi saat naga diklik (Manual Mining / Tap)
function tapDragon() {
    gameData.score += gameData.multiplier;
    
    // Umpan balik getaran di HP (Haptic Feedback)
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    updateUI();
}

// Fungsi memberi makan naga (Upgrade Level & Multiplier)
function feedDragon() {
    let cost = 50 * gameData.dragonLevel;
    if (gameData.score >= cost) {
        gameData.score -= cost;
        gameData.dragonLevel += 1;
        gameData.pps += 2;
        gameData.multiplier = gameData.dragonLevel;
        
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('heavy');
        }
        updateUI();
    } else {
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('error');
        }
        alert("Saldo NACKL tidak cukup untuk memberi makan naga!");
    }
}

// Memperbarui tampilan teks di layar (UI)
function updateUI() {
    document.getElementById('score').innerText = Math.floor(gameData.score);
    document.getElementById('pps').innerText = gameData.pps;
    document.getElementById('dragon-name').innerText = `Nacki Drago Lv. ${gameData.dragonLevel}`;
    document.getElementById('multiplier').innerText = `${gameData.multiplier}x`;
    document.getElementById('energy').innerText = gameData.energy;
    document.getElementById('feed-cost').innerText = 50 * gameData.dragonLevel;
}

// Auto-mine loop (Otomatis menambah saldo setiap 1 detik berdasarkan PPS)
setInterval(function() {
    gameData.score += gameData.pps;
    updateUI();
}, 1000);

// Jalankan update pertama kali saat game dimuat
updateUI();
