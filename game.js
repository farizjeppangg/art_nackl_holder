// Inisialisasi Telegram WebApp
let tg = window.Telegram.WebApp;
tg.ready();
tg.expand(); // Membuka Mini App secara otomatis dalam ukuran penuh (fullscreen)

// Ambil data akun Telegram pemain yang sedang login
let telegramUser = tg.initDataUnsafe?.user;
if (telegramUser) {
    document.getElementById('welcome-user').textContent = `Halo, ${telegramUser.first_name}! 👋`;
}

// Logika Game & Auto Mining
let score = 29700; 
let shiftEarnings = 233;
const productionRatePerHour = 528; 
const productionRatePerSecond = productionRatePerHour / 3600;

const balanceElement = document.getElementById('balance');
const claimBtn = document.getElementById('claim-btn');
const artCanvas = document.getElementById('art-canvas');
const shiftGainElement = document.getElementById('shift-gain');

let lastTimestamp = Date.now();

// Auto-mining otomatis setiap detik
setInterval(() => {
    const now = Date.now();
    const elapsedSeconds = (now - lastTimestamp) / 1000;
    lastTimestamp = now;

    shiftEarnings += productionRatePerSecond * elapsedSeconds;
    updateDisplay();
}, 1000);

// Background/Offline Mining: Hitung otomatis saat kembali dari latar belakang Telegram
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        const now = Date.now();
        const elapsedSeconds = (now - lastTimestamp) / 1000;
        lastTimestamp = now;

        shiftEarnings += productionRatePerSecond * elapsedSeconds;
        updateDisplay();
    } else {
        lastTimestamp = Date.now();
    }
});

// Aksi klik kanvas (Simulasi tap seni & persiapan fungsi add_tap SDK)
artCanvas.addEventListener('click', () => {
    score += 1;
    shiftEarnings += 1;
    updateDisplay();
    
    // Trigger getaran kecil di perangkat seluler via Telegram SDK jika didukung
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

// Klaim hasil shift
claimBtn.addEventListener('click', () => {
    score += Math.floor(shiftEarnings);
    shiftEarnings = 0;
    updateDisplay();
    
    // Kirim notifikasi popup kecil di dalam Telegram
    tg.showAlert("Hasil shift berhasil diklaim ke saldo utama penambangan!");
});

function updateDisplay() {
    balanceElement.textContent = Math.floor(score).toLocaleString();
    shiftGainElement.textContent = Math.floor(shiftEarnings).toLocaleString();
}

function switchTab(tabName) {
    tg.showAlert("Membuka menu: " + tabName);
}