// you can update this list with default names of your choice
const defaultNames = [
  "A","B","C"
];

let remaining = [];

chrome.storage.local.get(['remaining'], (result) => {
  if (result.remaining) {
    remaining = result.remaining;
    drawWheel(remaining);
    document.getElementById('nameInput').value = remaining.join('\n');
  }
});

document.getElementById('startBtn').onclick = () => {
  const raw = document.getElementById('nameInput').value.trim();
  const list = raw ? raw.split('\n').filter(n => n.trim()) : defaultNames;
  remaining = [...list];
  chrome.storage.local.set({ remaining });
  drawWheel(remaining);
};

document.getElementById('spinBtn').onclick = () => {
  if (remaining.length <= 1 || spinning) return;
  spinWheel(remaining, picked => {
    alert(`✅ ${picked} was picked!`);
    remaining = remaining.filter(name => name !== picked);
    chrome.storage.local.set({ remaining });
    drawWheel(remaining);
  });
};

document.getElementById('resetBtn').onclick = () => {
  remaining = [];
  document.getElementById('nameInput').value = '';
  chrome.storage.local.remove('remaining');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};