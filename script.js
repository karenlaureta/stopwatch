/* =========================
   Background Decorations
   ========================= */

/**
 * Create floating sparkles for visual effect
 */
for (let i = 0; i < 15; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.animationDuration = (3 + Math.random() * 3) + 's';
  document.body.appendChild(sparkle);
}

/**
 * Create animated clouds moving across the screen
 */
for (let i = 0; i < 5; i++) {
  const cloud = document.createElement('div');
  cloud.classList.add('cloud');

  const size = 50 + Math.random() * 50;
  cloud.style.width = size + 'px';
  cloud.style.height = size / 2 + 'px';
  cloud.style.top = Math.random() * 70 + 'vh';
  cloud.style.animationDuration = (20 + Math.random() * 30) + 's';

  document.body.appendChild(cloud);
}

/* =========================
   Stopwatch Logic
   ========================= */

let startTime, updatedTime, difference = 0, timerInterval;
let running = false;
let laps = [];

/* DOM references */
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

/**
 * Update stopwatch display
 */
function updateTime() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;
  timeDisplay.textContent = formatTime(difference);
}

/**
 * Convert milliseconds to HH:MM:SS.mmm format
 * @param {number} ms
 * @returns {string}
 */
function formatTime(ms) {
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = ms % 1000;

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(3, '0')
  );
}

/**
 * Update lap display with fastest and slowest highlights
 */
function updateLapDisplay() {
  lapsContainer.innerHTML = '';
  if (laps.length === 0) return;

  const fastest = Math.min(...laps);
  const slowest = Math.max(...laps);

  laps.forEach((lapTime, index) => {
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap');

    let label = '';
    if (lapTime === fastest) label = ' (Fastest)';
    if (lapTime === slowest) label = ' (Slowest)';
    if (fastest === slowest) label = ''; // if only 1 lap, no label
    if (fastest === slowest && laps.length === 1) label = '';

    lapDiv.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}${label}`;

    if (lapTime === fastest) lapDiv.classList.add('fastest');
    if (lapTime === slowest) lapDiv.classList.add('slowest');

    lapsContainer.appendChild(lapDiv);
  });
}

/* =========================
   Button Events
   ========================= */

/* Start button */
startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // Continue timing from previous value
    startTime = Date.now() - difference;
    timerInterval = setInterval(updateTime, 10);
  }
});

/* Stop button */
stopBtn.addEventListener('click', () => {
  running = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerInterval);
});

/* Lap button */
lapBtn.addEventListener('click', () => {
  if (running) {
    laps.push(difference);
    updateLapDisplay();
  }
});

/* Reset button */
resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(timerInterval);
  difference = 0;
  laps = [];

  timeDisplay.textContent = '00:00:00.000';
  lapsContainer.innerHTML = '';

  startBtn.disabled = false;
  stopBtn.disabled = true;
});
